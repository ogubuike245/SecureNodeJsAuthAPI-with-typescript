// Import necessary packages
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from './config/config';
import { allowedMethods } from './middleware/methods.middleware';
import { setHeaders } from './middleware/headers.middleware';
import Logger from './utils/Logger';

const { API_PORT } = process.env;

const SERVER_PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 9000;

// Create a new instance of the Express application
const app = express();

// Define middleware functions and serve static files
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());

// Add your other middleware and routes here

/** API Rules */
app.use(setHeaders);
// Allow only specific HTTP methods for certain routes
app.use(allowedMethods);

/** Healthcheck */
app.get('/ping', (req, res, next) => res.status(200).json({ message: 'WELCOME TO THE API' }));

/** Error handling */

// Call the function to connect to MongoDB
connectToDatabase(app);
