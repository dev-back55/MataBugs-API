import express from 'express';
import bodyParser from 'body-parser';
import playersRoutes from './routes/players.routes.js';

const app = express();
app.use(bodyParser.json());

//routes
app.use(playersRoutes)

export default app;