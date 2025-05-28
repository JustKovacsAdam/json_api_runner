import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dispatcher from './backend/dispatcher.js';
import logger from "./backend/logger.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, 'frontend');
logger.log('Static path:', frontendPath);

app.use(express.json());

app.post('/dispatch', async (req, res) => {
    const result = await dispatcher(req.body);
    res.json(result);
});

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
    logger.log(`Server running at http://localhost:${port}`);
});