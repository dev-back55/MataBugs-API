import express from 'express';
import bodyParser from 'body-parser';
import playersRoutes from './routes/players.routes.js';
import authRoutes from './routes/auth.routes.js'
const app = express();
app.use(bodyParser.json());

//routes

app.use('/player',playersRoutes)

// app.use(playersRoutes)
app.use(authRoutes)


export default app;