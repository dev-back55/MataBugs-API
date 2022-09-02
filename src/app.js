import express from 'express';
import bodyParser from 'body-parser';
import playersRoutes from './routes/players.routes.js';
import authRoutes from './routes/auth.routes.js'
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'))

//routes

app.use(playersRoutes)

// app.use(playersRoutes)
app.use(authRoutes)


export default app;