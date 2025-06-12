const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log,  // Optional: log SQL queries for debugging
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

// Define the Restaurants model
const Restaurant = sequelize.define('Restaurant', {
  restaurant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  campus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Campus',  // Assuming you have a Campus model
      key: 'campus_id',
    },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contact_info: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  operation_hours: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  solution_id: {
    type: DataTypes.CHAR(36),
    unique: true,
    allowNull: false,
  },
}, {
  tableName: 'Restaurants',
  timestamps: false,  // Disable timestamps if not using createdAt/updatedAt
});

// Export the model for use in other files
module.exports = Restaurant;
