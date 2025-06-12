const Review = require('../models/initData/schema/Reviews');

// Fetch all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json({ data: reviews });
    } catch (error) {
        console.error('❌ Error fetching reviews:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Fetch a single review by its ID
const getReviewById = async (req, res) => {
    const { review_id } = req.params;

    try {
        const review = await Review.findByPk(review_id);
        if (!review) {
            return res.status(404).json({ message: '❌ Review not found' });
        }
        res.status(200).json({ data: review });
    } catch (error) {
        console.error('❌ Error fetching the review:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Create a new review
const createReview = async (req, res) => {
    const { user_id, restaurant_id, rating, comment } = req.body;

    try {
        const newReview = await Review.create({ user_id, restaurant_id, rating, comment });
        res.status(201).json({ message: '✅ Review created successfully', data: newReview });
    } catch (error) {
        console.error('❌ Error creating the review:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Update an existing review
const updateReview = async (req, res) => {
    const { review_id } = req.params;
    const { rating, comment } = req.body;

    try {
        const updatedRows = await Review.update(
            { rating, comment },
            { where: { review_id } }
        );

        if (updatedRows[0] === 0) {
            return res.status(404).json({ message: '❌ Review not found' });
        }
        res.status(200).json({ message: '✅ Review updated successfully' });
    } catch (error) {
        console.error('❌ Error updating the review:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    const { review_id } = req.params;

    try {
        const deletedRows = await Review.destroy({ where: { review_id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: '❌ Review not found' });
        }
        res.status(200).json({ message: '✅ Review deleted successfully' });
    } catch (error) {
        console.error('❌ Error deleting the review:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
