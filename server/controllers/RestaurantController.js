const Restaurants = require('../models/initData/schema/Restaurants');

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurants.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurants.findByPk(id);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurants.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurants.findByPk(id);
    if (restaurant) {
      await restaurant.update(req.body);
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurants.findByPk(id);
    if (restaurant) {
      await restaurant.destroy();
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
