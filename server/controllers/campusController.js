const { Campus } = require('../models/initData/schema/Campus');

// Get all campuses
exports.getAllCampuses = async (req, res) => {
  try {
    const campuses = await Campus.findAll();
    res.status(200).json(campuses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving campuses', error: error.message });
  }
};

// Get a specific campus by ID
exports.getCampusById = async (req, res) => {
  const { id } = req.params;
  try {
    const campus = await Campus.findByPk(id);
    if (!campus) {
      return res.status(404).json({ message: 'Campus not found' });
    }
    res.status(200).json(campus);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving campus', error: error.message });
  }
};

// Create a new campus
exports.createCampus = async (req, res) => {
  const { name, location_details } = req.body;
  try {
    const newCampus = await Campus.create({ name, location_details });
    res.status(201).json({ message: 'Campus created successfully', campus: newCampus });
  } catch (error) {
    res.status(500).json({ message: 'Error creating campus', error: error.message });
  }
};

// Update an existing campus
exports.updateCampus = async (req, res) => {
  const { id } = req.params;
  const { name, location_details } = req.body;
  try {
    const campus = await Campus.findByPk(id);
    if (!campus) {
      return res.status(404).json({ message: 'Campus not found' });
    }
    campus.name = name || campus.name;
    campus.location_details = location_details || campus.location_details;
    await campus.save();
    res.status(200).json({ message: 'Campus updated successfully', campus });
  } catch (error) {
    res.status(500).json({ message: 'Error updating campus', error: error.message });
  }
};

// Delete a campus
exports.deleteCampus = async (req, res) => {
  const { id } = req.params;
  try {
    const campus = await Campus.findByPk(id);
    if (!campus) {
      return res.status(404).json({ message: 'Campus not found' });
    }
    await campus.destroy();
    res.status(200).json({ message: 'Campus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting campus', error: error.message });
  }
};
