require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const User = require('../schema/Users');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, 
  }
);

const insertUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    await sequelize.sync();

    // Read data from JSON file
    const data = fs.readFileSync(path.resolve(__dirname, '../data/user.json'), 'utf8');
    const users = JSON.parse(data);

    let insertedCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      if (!user.name || !user.email || !user.hostel_name || !user.room_number || !user.role) {
        console.log(`Skipping invalid user: ${JSON.stringify(user)}`);
        skippedCount++;
        continue;
      }

      const existingUser = await User.findOne({
        where: { email: user.email },
      });

      if (existingUser) {
        console.log(`❌ Skipped (already exists): ${user.email}`);
        skippedCount++;
        continue;
      }

      // Insert user
      try {
        await User.create({
          name: user.name,
          email: user.email,
          hostel_name: user.hostel_name,
          room_number: user.room_number,
          role: user.role,
        });
        console.log(`✅ Inserted user: ${user.name}`);
        insertedCount++;
      } catch (err) {
        console.error(`❌ Error inserting user: ${user.email}, err.message`);
        skippedCount++;
      }
    }

    console.log(`${insertedCount} user(s) inserted and ${skippedCount} skipped.`);
  } catch (err) {
    console.error('❌ Error inserting user data:', err.message);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

insertUser();