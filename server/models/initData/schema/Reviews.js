

const { Sequelize, DataTypes } = require('sequelize');
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
  });

const Review = sequelize.define('Review', {
    review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    review_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true,
    },
}, {
    tableName: 'Reviews', // Specify the table name explicitly
    timestamps: false, // Disable automatic timestamps
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('✅ Reviews table synced successfully.');
    })
    .catch((err) => {
        console.error('❌ Unable to sync the Reviews table:', err.message);
    });

module.exports = Review;