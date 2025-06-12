const Items = require('../models/initData/schema/Items');

class ItemController {
  // Get all items
  static async getAllItems(req, res) {
    try {
      const items = await Items.findAll();
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('❌ Error fetching items:', error.message);
      res.status(500).json({ success: false, message: 'Server error. Unable to fetch items.' });
    }
  }

  // Get a single item by ID
  static async getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = await Items.findByPk(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found.' });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.error('❌ Error fetching item:', error.message);
      res.status(500).json({ success: false, message: 'Server error. Unable to fetch the item.' });
    }
  }

  // Create a new item
  static async createItem(req, res) {
    try {
      const { restaurant_id, name, price, details, availability } = req.body;

      // Validate required fields
      if (!restaurant_id || !name || !price) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
      }

      const newItem = await Items.create({ restaurant_id, name, price, details, availability });
      res.status(201).json({ success: true, message: 'Item created successfully.', data: newItem });
    } catch (error) {
      console.error('❌ Error creating item:', error.message);
      res.status(500).json({ success: false, message: 'Server error. Unable to create the item.' });
    }
  }

  // Update an item by ID
  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { restaurant_id, name, price, details, availability } = req.body;

      const item = await Items.findByPk(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found.' });
      }

      await item.update({ restaurant_id, name, price, details, availability });
      res.status(200).json({ success: true, message: 'Item updated successfully.', data: item });
    } catch (error) {
      console.error('❌ Error updating item:', error.message);
      res.status(500).json({ success: false, message: 'Server error. Unable to update the item.' });
    }
  }

  // Delete an item by ID
  static async deleteItem(req, res) {
    try {
      const { id } = req.params;

      const item = await Items.findByPk(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found.' });
      }

      await item.destroy();
      res.status(200).json({ success: true, message: 'Item deleted successfully.' });
    } catch (error) {
      console.error('❌ Error deleting item:', error.message);
      res.status(500).json({ success: false, message: 'Server error. Unable to delete the item.' });
    }
  }
}

module.exports = ItemController;
