require('dotenv').config(); 

const { Sequelize } = require('sequelize');

console.log('Environment Variables:', {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  PORT: process.env.PORT,
});

const sequelize = new Sequelize(
  process.env.DB_NAME,    
  process.env.DB_USER,    
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    dialect: process.env.DB_DIALECT || 'mysql', 
    logging: console.log, 
  }
);

// Test the connection
const testConnection = async () => {
  try {
    console.log('🔄 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err.message);
    console.error('❌ Stack trace:', err.stack);
  }
};

module.exports = { sequelize, testConnection };
