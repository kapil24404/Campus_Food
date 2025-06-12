const cors = require('cors');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
};

module.exports = {
    corsMiddleware: cors(),
    rateLimiter: limiter,
    errorHandler,
    logger,
};
