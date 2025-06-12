const express = require('express');
const { corsMiddleware, rateLimiter, errorHandler } = require('./middlewares/index'); 

// Route imports
const campusRoutes = require('./routes/campusRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
const mobileNumberRoutes = require('./routes/mobileNumberRoutes');
const orderRoutes = require('./routes/orderRoutes');
const foodShopRoutes = require('./routes/foodShopRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const OrderDetailsRoutes = require('./routes/OrderDetailsRoute'); 
//const imageRoutes = require('./routes/imageRoutes'); // Importing image route

// Initialize express app
const app = express();

// Middleware
app.use(corsMiddleware); // Cross-Origin Resource Sharing
app.use(express.json()); // JSON body parser
app.use(rateLimiter); // Rate limiter for security

// Health Check
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Backend!' });
});

// API routes - Entry points 
app.use('/api/campus', campusRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/mobile-numbers', mobileNumberRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-details', OrderDetailsRoutes); // Added OrderDetails route
app.use('/api/food-shops', foodShopRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes); // User Entry Point
app.use('/api/payments', paymentRoutes); // Payment functionality
app.use('/api/reviews', reviewRoutes); // Review functionality

// Image handling routes
//app.use('/api/images', imageRoutes); // New route for image uploads and retrieval

// Handle 404 errors (route not found)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handling middleware
app.use(errorHandler);

// Export the app for server startup or testing
module.exports = app;
