import express from 'express';
import playersRoutes from '../src/routes/payers.routes.js';

const app = express();


//routes
app.use(playersRoutes)


export default app;