const express = require('express');
const router = express.Router();
const {
    getAllOrderDetails,
    getOrderDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
} = require('../controllers/orderDetailsController');

// Route for fetching all order details
router.get('/', getAllOrderDetails);

// Route for fetching order details by order_id
router.get('/:order_id', getOrderDetailsByOrderId);

// Route for creating a new order detail
router.post('/', createOrderDetail);

// Route for updating an order detail
router.put('/:order_id/:item_id', updateOrderDetail);

// Route for deleting an order detail
router.delete('/:order_id/:item_id', deleteOrderDetail);

module.exports = router;
