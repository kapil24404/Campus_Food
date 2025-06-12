const fs = require('fs').promises;
const path = require('path');
const sequelize = require('../database');
const FoodShop = require('../schema/FoodShop');

(async () => {
  const filePath = path.join(__dirname, '../data/ShopMenu');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const shops = JSON.parse(data);

    console.log('📂 Starting the insertion of food shops...');

    for (const shop of shops) {
      // Log the shop name to ensure it's not null
      console.log(`Checking if shop already exists: ${shop.name}`);

      // Check if the shop already exists in the database by its name (using the correct column name)
      const existingShop = await FoodShop.findOne({
        where: {
          shop_name: shop.name,  // Using 'shop_name' here as per the schema
        },
      });

      if (existingShop) {
        // Skip the shop if it already exists
        console.log(`❌ Skipped (already exists): ${shop.name}`);
        continue;
      }

      // Insert into FoodShop if it doesn't exist
      await FoodShop.create({
        shop_name: shop.name,  // Updated to use 'shop_name' instead of 'name'
        location: shop.location || null,
        contact_number: shop.contact_number || null,
        opening_hours: shop.opening_hours || null,
      });

      console.log(`✅ Inserted: ${shop.name}`);
    }

    console.log('🎉 Successfully inserted all food shops!');
  } catch (error) {
    console.error('❌ Error inserting food shops:', error.message);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed.');
  }
})();
