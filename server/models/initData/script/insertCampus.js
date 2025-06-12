require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { sequelize, Campus } = require('../schema/Campus'); 

const insertCampus = async () => {
  let transaction; // Declare transaction variable outside try block for scope

  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Ensure the Campus table is created or updated
    await sequelize.sync({ alter: true }); // Alter the table schema to match the model
    console.log('✅ Campus table synced successfully.');

    // Read data from campus.json file
    const data = fs.readFileSync(path.resolve(__dirname, '../data/campus.json'), 'utf8');
    const campusData = JSON.parse(data); // Parse JSON data

    // Start a new transaction
    transaction = await sequelize.transaction();

    try {
      for (const campus of campusData) {
        // Check if the campus already exists
        const existingCampus = await Campus.findOne({
          where: { name: campus.name },
          transaction, // Use transaction
        });
        if (existingCampus) {
          console.log(`⏩ Skipping duplicate campus: ${campus.name}`);
        } else {
          // Insert new campus record
          const campusRecord = await Campus.create({
            name: campus.name,
            location_details: campus.location_details,
          }, { transaction });

          console.log(`✅ Campus inserted: ${campusRecord.name}`);
        }
      }

      // Commit the transaction
      await transaction.commit();
      console.log('✅ All operations completed successfully.');
    } catch (error) {
      // Rollback the transaction in case of errors
      if (transaction) {
        await transaction.rollback();
      }
      console.error('❌ Transaction failed. Rolling back changes:', error.message);
    }
  } catch (error) {
    console.error('❌ Error inserting campus:', error.message);
  } finally {
    // Ensure database connection is closed after all operations are done
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

insertCampus();