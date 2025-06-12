require('dotenv').config(); // Load environment variables
const fs = require('fs').promises; // Use promises API for async operations
const path = require('path');
const { Sequelize } = require('sequelize');
const Items = require('../schema/Items'); // Import the Items model
const Images = require('../schema/Images'); // Import the Images model
// Sequelize connection setup using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name from .env
  process.env.DB_USER,    // Database user from .env
  process.env.DB_PASSWORD, // Database password from .env
  {
    host: process.env.DB_HOST,      // Host from .env
    dialect: process.env.DB_DIALECT, // Dialect (mysql, postgres, etc.) from .env
    logging: console.log, // Enable query logging
  }
);

(async () => {
  const shopMenuDir = path.join(__dirname, '../data/ShopMenu'); // Path to ShopMenu folder

  try {
    // Read all files in the ShopMenu directory
    const files = await fs.readdir(shopMenuDir);

    // Filter only JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    for (const file of jsonFiles) {
      console.log(`📂 Processing file: ${file}`);

      // Read and parse the JSON file
      const filePath = path.join(shopMenuDir, file);
      const data = await fs.readFile(filePath, 'utf-8');
      const items = JSON.parse(data);

      // Process each item in the file for update or insert
      for (const item of items) {
        // Check if the item already exists based on unique fields (restaurant_id and name)
        const existingItem = await Items.findOne({
          where: {
            restaurant_id: item.restaurant_id, // Check by restaurant_id and name if required
            name: item.name, // You can add more fields to make the item unique if needed
          }
        });

        if (existingItem) {
          console.log(`⏭ Item with restaurant_id ${item.restaurant_id} and name ${item.name} already exists. Skipping update.`);
          continue; // Skip this item if it already exists
        }

        // Validate data before inserting
        if (!item.restaurant_id || !item.name || !item.price) {
          console.error(`❌ Invalid data for item: ${JSON.stringify(item)}`);
          continue; // Skip invalid data
        }

        // If not found and data is valid, insert the item
        try {
          await Items.create({
            restaurant_id: item.restaurant_id,
            name: item.name,
            price: item.price,
            details: item.details || null, // Allow details to be optional
            availability: item.availability || 'available', // Default availability if not provided
            imgID:item.imgID||null, //
            
          });
          Items.belongsTo(Images, { foreignKey: 'imgID', targetKey: 'img_id' });
          console.log(`✅ Successfully inserted item: ${item.name}`);
        } catch (error) {
          console.error(`❌ Error inserting item: ${item.name}, Error: ${error.message}`);
        }
      }

      console.log(`✅ Successfully processed file: ${file}`);
    }

    console.log('🎉 All files processed successfully!');
  } catch (error) {
    console.error('❌ Error processing files:', error.message);
  } finally {
    await sequelize.close(); // Close database connection
  }
})();