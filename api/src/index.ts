import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

const api = express();
const PORT = process.env.PORT;

api.use('/', routes);

api.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
})