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

const Orders = sequelize.define('Orders', {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'user_id' },
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Restaurants', key: 'restaurant_id' },
  },
  order_datetime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Default to current timestamp
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: true, // Ensures Sequelize manages createdAt and updatedAt
});

// Sync the model with the database (creates the table if it doesn't exist)
(async () => {
  try {
    await Orders.sync({ force: false }); // Set to `true` to force synchronization and reset the table
    console.log('✅ Orders table has been synced with the database.');
  } catch (error) {
    console.error('❌ Error syncing the Orders table:', error.message);
  }
})();

module.exports = Orders;
