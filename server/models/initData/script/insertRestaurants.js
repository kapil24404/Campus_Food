const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Ensure dotenv is loaded

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // Optional: Log SQL queries for debugging
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err.message);
    process.exit(1); // Exit if DB connection fails
  });

// Define the Restaurants model
const Restaurants = require('../schema/Restaurants'); // Import the Restaurants model

// Function to insert restaurant data from JSON
const insertRestaurantsData = async () => {
  try {
    const filePath = path.resolve(__dirname, '../data/Restaurant.json');
    
    // Ensure the file exists before reading
    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ JSON file not found at: ${filePath}`);
    }

    // Read the restaurant data from the JSON file
    const data = fs.readFileSync(filePath, 'utf8');
    const restaurants = JSON.parse(data);

    // Insert each restaurant into the database
    for (const restaurant of restaurants) {
      try {
        // Validate required fields
        if (!restaurant.name || !restaurant.contact_info || !restaurant.solution_id) {
          console.log(`❌ Missing required fields in restaurant: ${JSON.stringify(restaurant)}`);
          continue;  // Skip this restaurant if required fields are missing
        }

        // Check if the solution_id is unique
        const existingRestaurant = await Restaurants.findOne({
          where: { solution_id: restaurant.solution_id },
        });

        if (existingRestaurant) {
          console.log(`❌ Duplicate solution_id found for restaurant: ${restaurant.name}`);
          continue;  // Skip the insertion of this restaurant
        }

        // Insert into the database
        await Restaurants.create(restaurant);
        console.log(`✅ Inserted restaurant: ${restaurant.name}`);
      } catch (err) {
        // Log validation error and continue
        console.error(`❌ Validation error for restaurant: ${JSON.stringify(restaurant)}`);
        console.error('Detailed error:', err.errors ? err.errors.map(e => e.message).join(', ') : err.message);
      }
    }

  } catch (err) {
    console.error('❌ Error inserting restaurant data:', err.message);
  } finally {
    // Only close the connection after all operations are complete
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

// Sync the model with the database (create table if it doesn't exist)
sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Restaurants table created or already exists.');
    // Call the function to insert data after syncing
    insertRestaurantsData();
  })
  .catch((err) => {
    console.error('❌ Unable to create the table:', err);
    process.exit(1); 
  });
