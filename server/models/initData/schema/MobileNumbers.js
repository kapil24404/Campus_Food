// Import required modules
require('dotenv').config(); // Ensure environment variables are loaded
const { Sequelize, DataTypes } = require('sequelize');

// Log the environment variables to verify they're being loaded
console.log('DB_DIALECT:', process.env.DB_DIALECT); // Debugging purpose to check if dialect is loaded correctly

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database username
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST,      // Database host
    dialect: process.env.DB_DIALECT, // Database dialect (e.g., mysql, postgres, sqlite)
    logging: console.log,           // Optional: Log SQL queries for debugging
  }
);

// Define the MobileNumbers model
const MobileNumbers = sequelize.define('MobileNumbers', {
  mobile_number: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'user_id',
    },
  },
}, {
  tableName: 'MobileNumbers',
  timestamps: false,
});
// Sync the model with the database
(async () => {
  try {
    // Check if the table exists
    const tableExists = await sequelize.getQueryInterface().tableExists('MobileNumbers');
    
    if (!tableExists) {
      console.log('MobileNumbers table does not exist. Creating it now...');
      // If table does not exist, sync the model
      await sequelize.sync({ force: true }); // Use 'force: true' to recreate the table if it doesn't exist
      console.log('✅ MobileNumbers table created successfully.');
    } else {
      console.log('✅ MobileNumbers table already exists.');
    }
  } catch (err) {
    console.error('❌ Error syncing MobileNumbers table:', err.message);
  }
})();

// Export the MobileNumbers model
module.exports = MobileNumbers;