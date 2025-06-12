const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const { sequelize, Images } = require('../schema/Images'); // Import sequelize and Images model

// Define the Items model
const Items = sequelize.define(
  'Items',
  {
    item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imgID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Images, // Reference the Images model
        key: 'img_id',
      },
    },
  },
  {
    tableName: 'Items',
    timestamps: false,
  }
);

// Define the foreign key relationship
Items.belongsTo(Images, { foreignKey: 'imgID', targetKey: 'img_id' });

// Sync the models with the database
(async () => {
  try {
    await Images.sync({ alter: true }); // Sync Images first
    await Items.sync({ alter: true }); // Sync Items after Images
    console.log('✅ Items table has been ensured in the database.');
  } catch (err) {
    console.error('❌ Error syncing Items table:', err.message);
  }
})();

module.exports = Items;