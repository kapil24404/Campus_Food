const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Orders = require('./Orders');  // Ensure the Orders model is imported

const Payments = sequelize.define('Payments', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Orders, // Refers to the Orders model
      key: 'order_id' // The key in the Orders model to which Payments references
    },
    onDelete: 'CASCADE', // Optional: Automatically delete payments when the associated order is deleted
    onUpdate: 'CASCADE'  // Optional: Automatically update payments when the associated order is updated
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  upi_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  merchant_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction_details: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  processed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'Payments',
  timestamps: false,
});

// Ensure the foreign key is created properly
Payments.belongsTo(Orders, { foreignKey: 'order_id', targetKey: 'order_id' });


// Sync the model with the database
(async () => {
  try {
    await Payments.sync({ alter: true }); // Adjust schema without dropping data
    console.log('✅ Payments table has been ensured in the database.');
  } catch (error) {
    console.error('❌ Error ensuring the Payments table:', error.message);
  }
})();

module.exports = Payments;
