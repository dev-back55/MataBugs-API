import express from 'express';
import playersRoutes from './routes/players.routes.js';

const app = express();


//routes
app.use(playersRoutes)


export default app;