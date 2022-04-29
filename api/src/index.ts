import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

const api = express();
const PORT = 3000;

api.use('/', routes);

dotenv.config();

api.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
})