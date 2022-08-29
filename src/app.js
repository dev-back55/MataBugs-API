import express from 'express';
import playersRoutes from './routes/players.routes.js';
import authRoutes from './routes/auth.routes.js'
const app = express();


//routes
app.use(playersRoutes)
app.use(authRoutes)


export default app;