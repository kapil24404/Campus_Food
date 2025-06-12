const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Initialize Sequelize with the credentials from .env file
const sequelize = new Sequelize(
  process.env.DB_NAME,         // Database name
  process.env.DB_USER,         // Database user
  process.env.DB_PASSWORD,     // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: process.env.DB_DIALECT || 'mysql', // Default to MySQL if not specified
    logging: process.env.NODE_ENV === 'development', // Log queries only in development
    pool: {
      max: 10,    // Maximum connections in pool
      min: 0,     // Minimum connections in pool
      acquire: 30000, // Maximum time (ms) to acquire connection
      idle: 10000,  // Maximum time (ms) a connection can be idle
    },
  }
);

// Define the AWSImg model (without imgKey)
const AWSImg = sequelize.define(
  'AWSImg',
  {
    img_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imgURL: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true, // Ensure URL is not empty
        isUrl: true,    // Validate the URL format
      },
    },
  },
  {
    tableName: 'AWSImg',  // Table name in the database
    timestamps: true,      // Add timestamps for image upload times
  }
);

// Sync the model with the database (ensure table exists)
(async () => {
  try {
    await AWSImg.sync({ alter: false }); // Use `alter: true` cautiously in dev, false in production
    console.log('✅ AWSImgs table has been ensured in the database.');
  } catch (err) {
    console.error('❌ Error syncing AWSImgs table:', err.message);
  }
})();

module.exports = AWSImg;
