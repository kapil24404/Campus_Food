const MobileNumbers = require('../models/initData/schema/MobileNumbers');

class MobileNumberController {
  // Get all mobile numbers
  static async getAllMobileNumbers(req, res) {
    try {
      const mobileNumbers = await MobileNumbers.findAll();
      res.status(200).json({ success: true, data: mobileNumbers });
    } catch (error) {
      console.error('❌ Error fetching mobile numbers:', error.message);
      res.status(500).json({ success: false, message: 'Unable to fetch mobile numbers.' });
    }
  }

  // Get a specific mobile number by mobile_number
  static async getMobileNumberById(req, res) {
    try {
      const { mobile_number } = req.params;
      const mobileNumber = await MobileNumbers.findByPk(mobile_number);

      if (!mobileNumber) {
        return res.status(404).json({ success: false, message: 'Mobile number not found.' });
      }

      res.status(200).json({ success: true, data: mobileNumber });
    } catch (error) {
      console.error('❌ Error fetching mobile number:', error.message);
      res.status(500).json({ success: false, message: 'Unable to fetch the mobile number.' });
    }
  }

  // Create a new mobile number entry
  static async createMobileNumber(req, res) {
    try {
      const { mobile_number, type, user_id, restaurant_id, solution_id, mobile_number_hash } = req.body;

      // Validate required fields
      if (!mobile_number || !user_id || !solution_id) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
      }

      const newMobileNumber = await MobileNumbers.create({
        mobile_number,
        type,
        user_id,
        restaurant_id,
        solution_id,
        mobile_number_hash,
      });

      res.status(201).json({
        success: true,
        message: 'Mobile number created successfully.',
        data: newMobileNumber,
      });
    } catch (error) {
      console.error('❌ Error creating mobile number:', error.message);
      res.status(500).json({ success: false, message: 'Unable to create the mobile number.' });
    }
  }

  // Update an existing mobile number by mobile_number
  static async updateMobileNumber(req, res) {
    try {
      const { mobile_number } = req.params;
      const { type, user_id, restaurant_id, solution_id, mobile_number_hash } = req.body;

      const mobileNumber = await MobileNumbers.findByPk(mobile_number);

      if (!mobileNumber) {
        return res.status(404).json({ success: false, message: 'Mobile number not found.' });
      }

      await mobileNumber.update({
        type,
        user_id,
        restaurant_id,
        solution_id,
        mobile_number_hash,
      });

      res.status(200).json({
        success: true,
        message: 'Mobile number updated successfully.',
        data: mobileNumber,
      });
    } catch (error) {
      console.error('❌ Error updating mobile number:', error.message);
      res.status(500).json({ success: false, message: 'Unable to update the mobile number.' });
    }
  }

  // Delete a mobile number by mobile_number
  static async deleteMobileNumber(req, res) {
    try {
      const { mobile_number } = req.params;

      const mobileNumber = await MobileNumbers.findByPk(mobile_number);

      if (!mobileNumber) {
        return res.status(404).json({ success: false, message: 'Mobile number not found.' });
      }

      await mobileNumber.destroy();

      res.status(200).json({ success: true, message: 'Mobile number deleted successfully.' });
    } catch (error) {
      console.error('❌ Error deleting mobile number:', error.message);
      res.status(500).json({ success: false, message: 'Unable to delete the mobile number.' });
    }
  }
}

module.exports = MobileNumberController;
