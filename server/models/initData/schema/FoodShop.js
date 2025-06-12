const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import sequelize instance
require('dotenv').config(); // Ensure dotenv is loaded

// Test the connection to the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to the database has been established successfully.');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err.message);
    process.exit(1); // Exit process on failure
  }
})();

// Define the FoodShop model
const FoodShop = sequelize.define(
  'FoodShop',
  {
    shop_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shop_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensure shop_name is not empty
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true, // Ensure only numeric values
        len: [10, 15], // Enforce reasonable length
      },
    },
    opening_hours: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'FoodShops', // Explicit table name
    timestamps: false, // Disable createdAt/updatedAt
    hooks: {
      // Optional: Hooks for debugging or additional logic
      beforeCreate: (shop) => {
        console.log(`Preparing to create shop: ${shop.shop_name}`);
      },
    },
  }
);

// Sync the model with the database (create the table if it does not exist)
(async () => {
  try {
    await FoodShop.sync({ alter: false }); // Use alter in dev for changes, false in production
    console.log('✅ FoodShops table has been ensured in the database.');
  } catch (error) {
    console.error('❌ Error ensuring the FoodShops table:', error.message);
  }
})();

module.exports = FoodShop;
