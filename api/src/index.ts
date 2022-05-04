import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

const api = express();
const PORT = process.env.PORT;

api.use(bodyParser.urlencoded({ extended: true }));
api.use(express.json())

api.use('/', routes);

api.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
})