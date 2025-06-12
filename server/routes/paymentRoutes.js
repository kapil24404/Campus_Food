const express = require('express');
const router = express.Router();
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');

// Route to get all payments
router.get('/', getAllPayments);

// Route to get a payment by ID
router.get('/:payment_id', getPaymentById);

// Route to create a new payment
router.post('/', createPayment);

// Route to update a payment
router.put('/:payment_id', updatePayment);

// Route to delete a payment
router.delete('/:payment_id', deletePayment);

// Route to process payments from a file
//router.post('/upload', processPaymentsFromFile);

module.exports = router;
