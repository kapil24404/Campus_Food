const express = require('express');
const MobileNumberController = require('../controllers/MobileNumberController');

const router = express.Router();

// Define routes for mobile numbers
router.get('/', MobileNumberController.getAllMobileNumbers);      // Get all mobile numbers
router.get('/:mobile_number', MobileNumberController.getMobileNumberById); // Get a mobile number by ID
router.post('/', MobileNumberController.createMobileNumber);      // Create a new mobile number
router.put('/:mobile_number', MobileNumberController.updateMobileNumber); // Update an existing mobile number by ID
router.delete('/:mobile_number', MobileNumberController.deleteMobileNumber); // Delete a mobile number by ID

module.exports = router;
