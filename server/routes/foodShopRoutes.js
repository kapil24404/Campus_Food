const express = require('express');
const {
  createFoodShop,
  getAllFoodShops,
  getFoodShopById,
  updateFoodShop,
  deleteFoodShop,
} = require('../controllers/FoodShopController');

const router = express.Router();

// Create a new food shop
router.post('/', createFoodShop);

// Get all food shops
router.get('/', getAllFoodShops);

// Get a single food shop by ID
router.get('/:shop_id', getFoodShopById);

// Update a food shop by ID
router.put('/:shop_id', updateFoodShop);

// Delete a food shop by ID
router.delete('/:shop_id', deleteFoodShop);

module.exports = router;
