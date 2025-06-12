const fs = require('fs').promises; // Import promises-based fs
const path = require('path'); // For handling file paths
const { sequelize, Images } = require('../schema/Images'); // Import sequelize instance and Images model

(async () => {
  const filePath = path.join(__dirname, '../data/images.json'); // Path to your JSON file

  try {
    const data = await fs.readFile(filePath, 'utf-8'); // Read the file content
    const images = JSON.parse(data); // Parse the JSON data

    console.log('📂 Starting the insertion of images...');

    // Loop through the images array and insert data into the Images table
    for (const image of images) {
      console.log(`Checking if image URL already exists: ${image.url}`);

      // Check if the image URL already exists in the database
      const existingImage = await Images.findOne({
        where: {
          url: image.url, // Check by URL to avoid duplicates
        },
      });

      if (existingImage) {
        // If the image already exists, skip the insertion
        console.log(`❌ Skipped (already exists): ${image.url}`);
        continue;
      }

      // Insert the new image URL into the Images table
      await Images.create({
        url: image.url, // Insert the image URL
      });

      console.log(`✅ Inserted: ${image.url}`);
    }

    console.log('🎉 Successfully inserted all images!');
  } catch (error) {
    console.error('❌ Error inserting images:', error.message);
  } finally {
    // Close the database connection only if sequelize is initialized
    if (sequelize) {
      try {
        await sequelize.close();
        console.log('🔌 Database connection closed.');
      } catch (closeError) {
        console.error('❌ Error closing the database connection:', closeError.message);
      }
    }
  }
})();
