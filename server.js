import express from 'express';
import dispatcher from './backend/dispatcher.js';
import logger from './backend/logger.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    logger.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});

app.post('/dispatch', async (req, res) => {
    try {
        const result = await dispatcher(req.body);
        res.json({ success: true, result });
    } catch (error) {
        logger.error('Dispatch error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
});