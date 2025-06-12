const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');

// Route for fetching all reviews
router.get('/', getAllReviews);

// Route for fetching a review by its ID
router.get('/:review_id', getReviewById);

// Route for creating a new review
router.post('/', createReview);

// Route for updating a review
router.put('/:review_id', updateReview);

// Route for deleting a review
router.delete('/:review_id', deleteReview);

module.exports = router;
