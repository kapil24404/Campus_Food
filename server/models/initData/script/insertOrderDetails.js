require('dotenv').config(); // Load environment variables
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const Orders = require('../schema/Orders'); // Import Orders schema
const OrderDetails = require('../schema/OrderDetails'); // Import OrderDetails schema

// Validate environment variables
const validateEnv = () => {
  const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT'];
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`❌ Missing required environment variable: ${envVar}`);
    }
  });
};

validateEnv();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  }
);

// Utility: Handle and log errors
const handleError = (err) => {
  console.error('❌ Error:', err.message || err);
  process.exit(1);
};

// Test the connection to the database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (err) {
    handleError(err);
  }
};

// Function to read and parse the JSON file
const readOrderDetailsData = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ JSON file not found at: ${filePath}`);
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    handleError(err);
  }
};

// Function to insert order details into the database
const insertOrderDetailsData = async (orderDetails) => {
  try {
    for (const orderDetail of orderDetails) {
      const transformedOrderDetail = {
        order_id: orderDetail.order_id,
        item_id: orderDetail.item_id,
        quantity: orderDetail.quantity,
        price_at_time: orderDetail.price,
      };

      if (
        !transformedOrderDetail.order_id ||
        !transformedOrderDetail.item_id ||
        !transformedOrderDetail.quantity ||
        !transformedOrderDetail.price_at_time
      ) {
        console.log(`⚠️ Skipping invalid order detail: ${JSON.stringify(orderDetail)}`);
        continue;
      }

      const orderExists = await Orders.findByPk(transformedOrderDetail.order_id);
      if (!orderExists) {
        console.log(`❌ Order ID ${transformedOrderDetail.order_id} does not exist in Orders. Skipping.`);
        continue;
      }

      const existingDetail = await OrderDetails.findOne({
        where: {
          order_id: transformedOrderDetail.order_id,
          item_id: transformedOrderDetail.item_id,
        },
      });

      if (existingDetail) {
        console.log(`⚠️ Duplicate entry skipped for Order ID: ${transformedOrderDetail.order_id}, Item ID: ${transformedOrderDetail.item_id}`);
        continue;
      }

      await OrderDetails.create(transformedOrderDetail);
      console.log(`✅ Inserted order detail for Order ID: ${transformedOrderDetail.order_id}, Item ID: ${transformedOrderDetail.item_id}`);
    }
  } catch (err) {
    handleError(err);
  }
};

// Function to sync and insert data
const syncAndInsertData = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ OrderDetails table created or already exists.');

    const filePath = path.resolve(__dirname, '../data/orderDetails.json');
    const orderDetails = await readOrderDetailsData(filePath);
    await insertOrderDetailsData(orderDetails);

  } catch (err) {
    handleError(err);
  }
};

// Main function to run the script
const run = async () => {
  try {
    await testConnection();
    await syncAndInsertData();
  } catch (err) {
    handleError(err);
  } finally {
    await sequelize.close();
    console.log('✅ Database connection closed.');
  }
};

run();
