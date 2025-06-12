const OrderDetails = require('../models/initData/schema/OrderDetails');

// Get all order details
const getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findAll();
        if (orderDetails.length === 0) {
            return res.status(404).json({ message: '❌ No order details found' });
        }
        res.status(200).json({ data: orderDetails });
    } catch (err) {
        console.error('❌ Error fetching order details:', err.message);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

// Get order details by order_id
const getOrderDetailsByOrderId = async (req, res) => {
    const { order_id } = req.params;
    if (!order_id) {
        return res.status(400).json({ message: '❌ Missing required parameter: order_id' });
    }

    try {
        const orderDetails = await OrderDetails.findAll({ where: { order_id } });
        if (orderDetails.length === 0) {
            return res.status(404).json({ message: `❌ No order details found for order_id: ${order_id}` });
        }
        res.status(200).json({ data: orderDetails });
    } catch (err) {
        console.error(`❌ Error fetching order details for order_id ${order_id}:`, err.message);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

// Create a new order detail
const createOrderDetail = async (req, res) => {
    const { order_id, item_id, quantity, price_at_time } = req.body;

    // Validate the incoming request
    if (!order_id || !item_id || !quantity || !price_at_time) {
        return res.status(400).json({ message: '❌ Missing required fields: order_id, item_id, quantity, price_at_time' });
    }

    try {
        const newOrderDetail = await OrderDetails.create({ order_id, item_id, quantity, price_at_time });
        res.status(201).json({ message: '✅ Order detail created successfully', data: newOrderDetail });
    } catch (err) {
        console.error('❌ Error creating order detail:', err.message);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

// Update an order detail
const updateOrderDetail = async (req, res) => {
    const { order_id, item_id } = req.params;
    const { quantity, price_at_time } = req.body;

    // Validate the incoming request
    if (!order_id || !item_id) {
        return res.status(400).json({ message: '❌ Missing required parameters: order_id or item_id' });
    }
    if (!quantity || !price_at_time) {
        return res.status(400).json({ message: '❌ Missing required fields: quantity or price_at_time' });
    }

    try {
        const updatedRows = await OrderDetails.update(
            { quantity, price_at_time },
            { where: { order_id, item_id } }
        );

        if (updatedRows[0] === 0) {
            return res.status(404).json({ message: `❌ No order detail found for order_id: ${order_id} and item_id: ${item_id}` });
        }

        res.status(200).json({ message: '✅ Order detail updated successfully' });
    } catch (err) {
        console.error(`❌ Error updating order detail for order_id ${order_id}, item_id ${item_id}:`, err.message);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

// Delete an order detail
const deleteOrderDetail = async (req, res) => {
    const { order_id, item_id } = req.params;

    if (!order_id || !item_id) {
        return res.status(400).json({ message: '❌ Missing required parameters: order_id or item_id' });
    }

    try {
        const deletedRows = await OrderDetails.destroy({ where: { order_id, item_id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: `❌ No order detail found for order_id: ${order_id} and item_id: ${item_id}` });
        }

        res.status(200).json({ message: '✅ Order detail deleted successfully' });
    } catch (err) {
        console.error(`❌ Error deleting order detail for order_id ${order_id}, item_id ${item_id}:`, err.message);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

module.exports = {
    getAllOrderDetails,
    getOrderDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
};
