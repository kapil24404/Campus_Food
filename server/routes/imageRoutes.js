const express = require('express');
const multer = require('multer');
const path = require('path');
const imageController = require('../controllers/imageController'); // Importing controller

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the filename to be unique
  }
});

const upload = multer({ storage: storage });

// Route for image uploading
router.post('/upload', upload.single('image'), imageController.uploadImage);

// Route for fetching image by name or ID
router.get('/:imageName', imageController.getImage);

module.exports = router;
