// Import necessary packages
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from './config/config';
import { allowedMethods } from './middleware/methods.middleware';
import { setHeaders } from './middleware/headers.middleware';
import userRouter from './routes/user.route';
import { getStatus } from './middleware/status.middleware';

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
app.use(getStatus);
// Allow only specific HTTP methods for certain routes
app.use(allowedMethods);

/** Healthcheck */
app.get('/api/v1/ping', (req, res, next) =>
    res.status(200).json({ message: 'WELCOME TO THE API' })
);

/**APP ROUTES */

app.use('/api/v1/user', userRouter);

/** Error handling */

// Call the function to connect to MongoDB
connectToDatabase(app);
