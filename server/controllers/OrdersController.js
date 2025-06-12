const Orders = require('../models/initData/schema/Orders');


class OrderController {
  // Get all orders
  static async getAllOrders(req, res) {
    try {
      const orders = await Orders.findAll();
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.error('❌ Error fetching orders:', error.message);
      res.status(500).json({ success: false, message: 'Unable to fetch orders.' });
    }
  }

  // Get a specific order by ID
  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.findByPk(id);

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      res.status(200).json({ success: true, data: order });
    } catch (error) {
      console.error('❌ Error fetching order:', error.message);
      res.status(500).json({ success: false, message: 'Unable to fetch the order.' });
    }
  }

  // Create a new order
  static async createOrder(req, res) {
    try {
      const { user_id, restaurant_id, status } = req.body;

      // Validate required fields
      if (!user_id || !restaurant_id || !status) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
      }

      const newOrder = await Orders.create({ user_id, restaurant_id, status });
      res.status(201).json({ success: true, message: 'Order created successfully.', data: newOrder });
    } catch (error) {
      console.error('❌ Error creating order:', error.message);
      res.status(500).json({ success: false, message: 'Unable to create the order.' });
    }
  }

  // Update an existing order by ID
  static async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { user_id, restaurant_id, status } = req.body;

      const order = await Orders.findByPk(id);

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      await order.update({ user_id, restaurant_id, status });
      res.status(200).json({ success: true, message: 'Order updated successfully.', data: order });
    } catch (error) {
      console.error('❌ Error updating order:', error.message);
      res.status(500).json({ success: false, message: 'Unable to update the order.' });
    }
  }

  // Delete an order by ID
  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;

      const order = await Orders.findByPk(id);

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      await order.destroy();
      res.status(200).json({ success: true, message: 'Order deleted successfully.' });
    } catch (error) {
      console.error('❌ Error deleting order:', error.message);
      res.status(500).json({ success: false, message: 'Unable to delete the order.' });
    }
  }
}

module.exports = OrderController;
