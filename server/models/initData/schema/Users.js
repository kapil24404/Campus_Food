const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const MobileNumbers = require('./MobileNumbers');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err.message);
  });


const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  hostel_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  room_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'owner'),
    defaultValue: 'user',
    allowNull: false,
  },
}, {
  timestamps: true, 
});

(async () => {
  try {
    await User.sync({ alter: true }); // 
    console.log('✅ Users table is up-to-date.');
  } catch (error) {
    console.error('❌ Error syncing Users table:', error.message);
  }
})();

User.hasMany(MobileNumbers, {
  foreignKey: 'user_id',
  as: 'mobileNumbers', // Alias
});

MobileNumbers.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

module.exports = User;
