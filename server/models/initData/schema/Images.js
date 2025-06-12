const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Define the Images model
const Images = sequelize.define(
  'Images',
  {
    img_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    tableName: 'Images',
    timestamps: false,
  }
);

// Sync the Images model (this will ensure that the table exists)
(async () => {
  try {
    await Images.sync();
    console.log('✅ Images table has been ensured in the database.');
  } catch (err) {
    console.error('❌ Error syncing Images table:', err.message);
  }
})();

// Export only the model and sequelize instance
module.exports = { sequelize, Images };
