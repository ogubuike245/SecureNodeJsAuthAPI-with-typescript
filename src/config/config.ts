// Importing the Mongoose package
import mongoose from 'mongoose';

import Logger from '../utils/Logger';

// Extracting the API_PORT and MONG0_DB_URI environment variables
const { MONGO_DB_URI } = process.env;

// Defining an asynchronous function that connects to a MongoDB database
const connectToDatabase = async (app: any) => {
    try {
        // Connecting to the MongoDB database using the MONG0_DB_URI and some options

        await mongoose.set('strictQuery', false).connect(MONGO_DB_URI!);

        Logger.info('CONNECTED TO MONGODB DATABASE');
    } catch (error) {
        // Logging any errors that occur during the database connection or app start-up
        Logger.error(error);
    }
};

// Exporting the connectToDatabase function so it can be used in other parts of the application
export default connectToDatabase;
