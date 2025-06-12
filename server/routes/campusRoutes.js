const express = require('express');
const {
  getAllCampuses,
  getCampusById,
  createCampus,
  updateCampus,
  deleteCampus
} = require('../controllers/campusController');

const router = express.Router();

// Route to get all campuses
router.get('/', getAllCampuses);

// Route to get a specific campus by ID
router.get('/:id', getCampusById);

// Route to create a new campus
router.post('/', createCampus);

// Route to update an existing campus
router.put('/:id', updateCampus);

// Route to delete a campus
router.delete('/:id', deleteCampus);

module.exports = router;
