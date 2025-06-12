const { Payments } = require('../models/initData/schema/Payments');
const fs = require('fs');
const path = require('path');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll();
    res.status(200).json(payments);
  } catch (error) {
    console.error('❌ Error fetching payments:', error.message);
    res.status(500).json({ message: 'Error fetching payments.' });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  const { payment_id } = req.params;
  try {
    const payment = await Payments.findByPk(payment_id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('❌ Error fetching payment:', error.message);
    res.status(500).json({ message: 'Error fetching payment.' });
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  const { order_id, transaction_details, status } = req.body;
  try {
    const newPayment = await Payments.create({
      order_id,
      transaction_details,
      status,
    });
    res.status(201).json(newPayment);
  } catch (error) {
    console.error('❌ Error creating payment:', error.message);
    res.status(500).json({ message: 'Error creating payment.' });
  }
};

// Update an existing payment
const updatePayment = async (req, res) => {
  const { payment_id } = req.params;
  const { transaction_details, status, processed_at } = req.body;
  try {
    const payment = await Payments.findByPk(payment_id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }
    payment.transaction_details = transaction_details || payment.transaction_details;
    payment.status = status || payment.status;
    payment.processed_at = processed_at || payment.processed_at;
    await payment.save();
    res.status(200).json(payment);
  } catch (error) {
    console.error('❌ Error updating payment:', error.message);
    res.status(500).json({ message: 'Error updating payment.' });
  }
};

// Delete a payment
const deletePayment = async (req, res) => {
  const { payment_id } = req.params;
  try {
    const payment = await Payments.findByPk(payment_id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }
    await payment.destroy();
    res.status(200).json({ message: 'Payment deleted successfully.' });
  } catch (error) {
    console.error('❌ Error deleting payment:', error.message);
    res.status(500).json({ message: 'Error deleting payment.' });
  }
};



module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
 
};
