const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Ensure dotenv is loaded

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Disable logging for production or use it for debugging
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err.message);
  });

// Define the OrderDetails model
const OrderDetails = sequelize.define('OrderDetails', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders', // Ensure 'Orders' table exists in your database
      key: 'order_id',
    },
    onDelete: 'CASCADE',
    primaryKey: true, // Part of the composite primary key
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Items', // Ensure 'Items' table exists in your database
      key: 'item_id',
    },
    onDelete: 'CASCADE',
    primaryKey: true, // Part of the composite primary key
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // Ensure quantity is at least 1
    },
  },
  price_at_time: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01, // Ensure price is a positive value
    },
  },
}, {
  tableName: 'OrderDetails',
  timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
});

// Sync the model with the database
(async () => {
  try {
    await OrderDetails.sync({ alter: true }); // Adjust schema without dropping data
    console.log('✅ OrderDetails table has been ensured in the database.');
  } catch (error) {
    console.error('❌ Error ensuring the OrderDetails table:', error.message);
  }
})();

module.exports = OrderDetails;