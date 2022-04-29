import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

const app = express();
const PORT = 3000;

app.use('/', routes);

dotenv.config();