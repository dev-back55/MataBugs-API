import express from 'express';
import bodyParser from 'body-parser';
import playersRoutes from './routes/players.routes.js';
import authRoutes from './routes/auth.routes.js';
import passwordRoutes from './routes/password.routes.js'
import morgan from 'morgan';
import dotenv from "dotenv";
//import cors from "cors";

dotenv.config()

const { CLIENT_URL } = process.env;

const app = express();
//app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// CORS CONFIGURATION
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//routes
app.use(playersRoutes)
app.use(authRoutes)
app.use(passwordRoutes)


export default app;