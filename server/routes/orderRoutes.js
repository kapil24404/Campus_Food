const express = require('express');
const OrderController = require('../controllers/OrdersController');

const router = express.Router();

// Define routes for orders
router.get('/', OrderController.getAllOrders);          // Get all orders
router.get('/:id', OrderController.getOrderById);       // Get an order by ID
router.post('/', OrderController.createOrder);          // Create a new order
router.put('/:id', OrderController.updateOrder);        // Update an order by ID
router.delete('/:id', OrderController.deleteOrder);     // Delete an order by ID

module.exports = router;
