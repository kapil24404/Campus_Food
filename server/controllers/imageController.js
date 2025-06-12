const path = require('path');
const fs = require('fs');

// Upload Image Controller
exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl: `/api/images/${req.file.filename}` // URL to access the image
    });
};

// Get Image by Name Controller
exports.getImage = (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../uploads', imageName);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.sendFile(imagePath); // Serve the image file
    });
};
