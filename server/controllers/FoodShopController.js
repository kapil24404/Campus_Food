const FoodShop = require('../models/initData/schema/FoodShop');

// Create a new food shop
exports.createFoodShop = async (req, res) => {
  try {
    const { shop_name, location, contact_number, opening_hours } = req.body;
    const newShop = await FoodShop.create({
      shop_name,
      location,
      contact_number,
      opening_hours,
    });
    res.status(201).json({
      message: 'Food shop created successfully',
      data: newShop,
    });
  } catch (err) {
    console.error('❌ Error creating food shop:', err.message);
    res.status(500).json({
      message: 'Failed to create food shop',
      error: err.message,
    });
  }
};

// Get all food shops
exports.getAllFoodShops = async (req, res) => {
  try {
    const foodShops = await FoodShop.findAll();
    res.status(200).json(foodShops);
  } catch (err) {
    console.error('❌ Error fetching food shops:', err.message);
    res.status(500).json({
      message: 'Failed to fetch food shops',
      error: err.message,
    });
  }
};

// Get a single food shop by ID
exports.getFoodShopById = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const foodShop = await FoodShop.findByPk(shop_id);

    if (!foodShop) {
      return res.status(404).json({
        message: 'Food shop not found',
      });
    }

    res.status(200).json(foodShop);
  } catch (err) {
    console.error('❌ Error fetching food shop:', err.message);
    res.status(500).json({
      message: 'Failed to fetch food shop',
      error: err.message,
    });
  }
};

// Update a food shop by ID
exports.updateFoodShop = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const { shop_name, location, contact_number, opening_hours } = req.body;

    const foodShop = await FoodShop.findByPk(shop_id);

    if (!foodShop) {
      return res.status(404).json({
        message: 'Food shop not found',
      });
    }

    await foodShop.update({
      shop_name,
      location,
      contact_number,
      opening_hours,
    });

    res.status(200).json({
      message: 'Food shop updated successfully',
      data: foodShop,
    });
  } catch (err) {
    console.error('❌ Error updating food shop:', err.message);
    res.status(500).json({
      message: 'Failed to update food shop',
      error: err.message,
    });
  }
};

// Delete a food shop by ID
exports.deleteFoodShop = async (req, res) => {
  try {
    const { shop_id } = req.params;

    const foodShop = await FoodShop.findByPk(shop_id);

    if (!foodShop) {
      return res.status(404).json({
        message: 'Food shop not found',
      });
    }

    await foodShop.destroy();
    res.status(200).json({
      message: 'Food shop deleted successfully',
    });
  } catch (err) {
    console.error('❌ Error deleting food shop:', err.message);
    res.status(500).json({
      message: 'Failed to delete food shop',
      error: err.message,
    });
  }
};
