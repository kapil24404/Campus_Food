require('dotenv').config(); // Load environment variables

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const Review = require('../schema/Reviews'); // Assuming you have a Review schema
const User = require('../schema/Users');
const Restaurant = require('../schema/Restaurants');

// Validate environment variables
const validateEnv = () => {
  const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT'];
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`❌ Missing required environment variable: ${envVar}`);
    }
  });
};

validateEnv();

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log SQL queries in development mode
  }
);

// Function to log and handle errors
const handleError = (err) => {
  console.error('❌ Error:', err.message || err);
  process.exit(1); // Exit the process if there's an error
};

// Function to test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (err) {
    handleError(err);
  }
};

// Function to read and parse the review data from the JSON file
const readReviewData = async (filePath) => {
  try {
    // Ensure the file exists before reading
    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ JSON file not found at: ${filePath}`);
    }

    // Read and parse the data
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    handleError(err);
  }
};

// Function to insert review data into the database
const insertReviews = async (reviews) => {
  try {
    for (const review of reviews) {
      // Validate required fields in review
      if (!review.user_id || !review.restaurant_id || !review.rating || !review.comment) {
        console.log(`⚠️ Skipping invalid review: ${JSON.stringify(review)}`);
        continue;
      }

      // Check if the user exists
      const userExists = await User.findByPk(review.user_id);
      if (!userExists) {
        console.log(`❌ User with ID ${review.user_id} does not exist`);
        continue;
      }

      // Check if the restaurant exists
      const restaurantExists = await Restaurant.findByPk(review.restaurant_id);
      if (!restaurantExists) {
        console.log(`❌ Restaurant with ID ${review.restaurant_id} does not exist`);
        continue;
      }

      // Insert the new review into the database
      await Review.create({
        user_id: review.user_id,
        restaurant_id: review.restaurant_id,
        rating: review.rating,
        comment: review.comment,
        review_date: review.review_date || new Date(),
      });

      console.log(`✅ Inserted review for restaurant ${review.restaurant_id} by user ${review.user_id}`);
    }
  } catch (err) {
    handleError(err);
  }
};

// Function to sync models and insert data
const syncAndInsertData = async () => {
  try {
    // Sync the models with the database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced with the database.');

    // Read the review data from JSON file
    const filePath = path.resolve(__dirname, '../data/reviews.json');
    const reviews = await readReviewData(filePath);

    // Insert the review data into the database
    await insertReviews(reviews);

  } catch (err) {
    handleError(err);
  } finally {
    // Close the connection once all operations are complete
    await sequelize.close();
    console.log('✅ Database connection closed.');
  }
};

// Run the entire process
const run = async () => {
  await testConnection();
  await syncAndInsertData();
};

run();
