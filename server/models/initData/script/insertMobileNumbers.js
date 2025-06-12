const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Ensure dotenv is loaded
const MobileNumbers = require('../schema/MobileNumbers'); // Update the path if necessary


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

// Define the MobileNumbers model


// Function to insert mobile number data from JSON
const insertMobileNumbersData = async () => {
  const transaction = await sequelize.transaction();

  try {
    const filePath = path.resolve(__dirname, '../data/MobileNumbers.json');
    
    // Ensure the file exists before reading
    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ JSON file not found at: ${filePath}`);
    }

    // Read the mobile number data from the JSON file
    const data = fs.readFileSync(filePath, 'utf8');
    const mobileNumbers = JSON.parse(data);

    // Insert each mobile number into the database
    for (const mobileNumber of mobileNumbers) {
      try {
        // Validate required fields
        if (!mobileNumber.mobile_number || !mobileNumber.solution_id || !mobileNumber.user_id) {
          console.log(`❌ Missing required fields in mobile number: ${JSON.stringify(mobileNumber)}`);
          continue;  // Skip this mobile number if required fields are missing
        }

        // Insert into the database
        await MobileNumbers.create(mobileNumber, { transaction });
        console.log(`✅ Inserted mobile number: ${mobileNumber.mobile_number}`);

      } catch (err) {
        // Log validation error and continue
        console.error(`❌ Validation error for mobile number: ${JSON.stringify(mobileNumber)}`);
        console.error('Detailed error:', err.errors ? err.errors.map(e => e.message).join(', ') : err.message);
      }
    }

    // Commit the transaction if all operations are successful
    await transaction.commit();
    console.log('✅ All mobile numbers inserted and transaction committed.');

  } catch (err) {
    // If there is an error, rollback the transaction
    await transaction.rollback();
    console.error('❌ Error occurred. Transaction rolled back:', err);
  } finally {
    // Only close the connection after all operations are complete
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

// Sync the model with the database (create table if it doesn't exist)
sequelize.sync({ alter: true }) // Using alter to adjust schema changes automatically
  .then(() => {
    console.log('✅ MobileNumbers table created or already exists.');
    // Call the function to insert data after syncing
    insertMobileNumbersData();
  })
  .catch((err) => {
    console.error('❌ Unable to create the table:', err);
    process.exit(1); // Exit if syncing fails
  });
