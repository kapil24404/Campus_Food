const express = require('express');
const ItemController = require('../controllers/ItemsController');

const router = express.Router();

// Define routes for items
router.get('/', ItemController.getAllItems);              // Get all items
router.get('/:id', ItemController.getItemById);           // Get a single item by ID
router.post('/', ItemController.createItem);              // Create a new item
router.put('/:id', ItemController.updateItem);            // Update an item by ID
router.delete('/:id', ItemController.deleteItem);         // Delete an item by ID

module.exports = router;
