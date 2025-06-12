require('dotenv').config();
const { logger } = require('./middlewares');
const app = require('./app');
const db = require('../server/config/database');

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    try {
        await db.testConnection();
        logger.info('✅ Database connected successfully');
    } catch (err) {
        logger.error(`❌ Database connection failed: ${err.message}`);
        process.exit(1);
    }
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
