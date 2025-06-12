const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Validate essential environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1); // Exit if any required variable is missing
  }
});

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database username
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST,      // Database host
    dialect: process.env.DB_DIALECT, // Database dialect (e.g., mysql, postgres, etc.)
    logging: false,                 // Disable logging for production
  }
);

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1); // Gracefully exit if connection fails
  }
})();

// Define the Campus model
const Campus = sequelize.define('Campus', {
  campus_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // Add uniqueness constraint to prevent duplicates
  },
  location_details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'Campus', // Explicitly set table name
  timestamps: false,   // Disable automatic timestamps (createdAt, updatedAt)
});

// Synchronize model with the database
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Adjust the table structure if needed
    console.log('✅ Campus table synced successfully.');
  } catch (error) {
    console.error('❌ Error syncing Campus table:', error.message);
  }
})();

// Export Sequelize instance and Campus model
module.exports = {
  sequelize, // Exporting Sequelize instance for reuse in other files
  Campus,    // Exporting the Campus model
};