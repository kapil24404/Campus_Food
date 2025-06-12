const fs = require('fs');
const path = require('path');
const sequelize = require('../database');  // Import sequelize instance
const Payments = require('../schema/Payments');  // Import Payments model
const Orders = require('../schema/Orders');  // Import Orders model

// Sync database function (alter schema)
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync the tables with automatic schema alteration
    await Payments.sync({ alter: true });
    console.log('✅ Payments table is synced with the database.');

    await Orders.sync({ alter: true });
    console.log('✅ Orders table is synced with the database.');
  } catch (error) {
    console.error('❌ Error syncing tables:', error.message);
  }
};

// Read payment data from JSON file and process payments
const processPayments = async () => {
  try {
    const filePath = path.join(__dirname, '../data/Payments.json');
    let paymentsData = [];

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      paymentsData = JSON.parse(fileContent);
    } catch (err) {
      console.error('❌ Error reading or parsing Payments JSON file:', err.message);
      return;
    }

    // Sync the tables before inserting data
    await syncDatabase();  // Ensure tables are synchronized before any operations

    // Function to process each payment with retry mechanism in case of deadlock
    const processPaymentWithRetry = async (payment) => {
      let retries = 3; // Number of retries in case of deadlock
      let lastError = null;

      while (retries > 0) {
        const t = await sequelize.transaction();
        try {
          // Check if the referenced order_id exists in Orders table
          const orderExists = await Orders.findOne({ where: { order_id: payment.order_id }, transaction: t });

          if (!orderExists) {
            console.error(`❌ Order with order_id ${payment.order_id} does not exist. Skipping.`);
            await t.rollback();
            return;
          }

          // Check for duplicate Payments record
          const existingPayment = await Payments.findOne({ where: { order_id: payment.order_id }, transaction: t });
          if (existingPayment) {
            console.log(`⚠️ Payment for order_id ${payment.order_id} already exists. Skipping.`);
            await t.rollback();
            return;
          }

          // Insert the new payment record
          const newPayment = await Payments.create({
            order_id: payment.order_id,
            amount: payment.amount,
            upi_id: payment.upi_id,
            merchant_name: payment.merchant_name,
            transaction_details: payment.transaction_details,
            status: payment.status,
            processed_at: payment.processed_at,
          }, { transaction: t });

          console.log('✅ Payment inserted:', newPayment.toJSON());
          await t.commit();  // Commit the transaction after successful insert
          return; // Exit the retry loop after successful insertion
        } catch (err) {
          console.error(`❌ Failed to process payment for order_id ${payment.order_id}:`, err.message);
          await t.rollback();
          lastError = err;
          if (err.message.includes("Deadlock")) {
            retries--; // Retry if it's a deadlock error
            console.log(`⚠️ Deadlock detected. Retrying... (${3 - retries} retries left)`);
          } else {
            break; // Exit the loop if it's not a deadlock error
          }
        }
      }

      if (retries === 0) {
        console.error(`❌ Failed to process payment for order_id ${payment.order_id} after retries.`, lastError?.message);
      }
    };

    // Process payments concurrently with retry mechanism
    await Promise.all(paymentsData.map(processPaymentWithRetry));

  } catch (error) {
    console.error('❌ Error processing payments:', error.message);
  }
};

// Close database connection
const closeConnection = async () => {
  try {
    await sequelize.close(); // Close the connection after all operations
    console.log('✅ Database connection closed.');
  } catch (closeError) {
    console.error('❌ Error closing the database connection:', closeError.message);
  }
};

// Main execution block
(async () => {
  try {
    await processPayments();  // Process payments after ensuring sync
  } catch (error) {
    console.error('❌ Error in main execution:', error.message);
  } finally {
    await closeConnection();  // Ensure database connection is closed after operations
  }
})();
