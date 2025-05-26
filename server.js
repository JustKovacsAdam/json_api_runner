import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dispatcher from './backend/dispatcher.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, 'frontend');
console.log('Static path:', frontendPath);  // Debug line

app.use(bodyParser.json());

app.post('/dispatch', async (req, res) => {
    const result = await dispatcher(req.body);
    res.json(result);
});

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});