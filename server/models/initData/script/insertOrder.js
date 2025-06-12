require('dotenv').config(); // Load environment variables from .env file

const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Orders = require('../schema/Orders'); // Import the Orders schema

// Initialize Sequelize with values from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Function to insert orders
const insertOrders = async () => {
  try {
    // Authenticate the connection once
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    // Sync models with the database (table creation or schema update)
    await sequelize.sync({ alter: true }); // Use alter: true to update schema if necessary

    // Read order data from JSON file
    const data = fs.readFileSync(path.resolve(__dirname, '../data/order.json'), 'utf8');
    const orders = JSON.parse(data);

    // Insert each order into the database
    for (const order of orders) {
      // Validate the required fields before inserting
      if (!order.user_id || !order.restaurant_id || !order.status) {
        console.log(`❌ Invalid order data: ${JSON.stringify(order)}`);
        continue;  // Skip invalid orders
      }

      // Check if the order already exists
      const existingOrder = await Orders.findOne({
        where: {
          user_id: order.user_id,
          restaurant_id: order.restaurant_id,
          status: order.status, // Check if the same status order already exists
        },
      });

      if (existingOrder) {
        console.log(
          `⚠️ Duplicate order skipped for user_id = ${order.user_id}, restaurant_id = ${order.restaurant_id}`
        );
        continue; // Skip the duplicate entry
      }

      // Add the current date and time for order_datetime if not provided
      const orderData = {
        user_id: order.user_id,
        restaurant_id: order.restaurant_id,
        order_datetime: order.order_datetime || new Date(), // Use the provided datetime or current time
        status: order.status,
      };

      // Insert the valid order into the Orders table
      try {
        await Orders.create(orderData);
        console.log(`✅ Inserted order for user_id = ${order.user_id} with status = ${order.status}`);
      } catch (err) {
        console.error(`❌ Error inserting order for user_id = ${order.user_id}:`, err.message);
      }
    }
  } catch (err) {
    console.error('❌ Error inserting orders:', err.message);
  } finally {
    // Close the Sequelize connection after processing
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

// Call the function to insert orders
insertOrders();
