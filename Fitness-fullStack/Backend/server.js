import express from 'express';
import bodyParser from 'body-parser';
import router from './Routes.js';
import cors from 'cors';
import { connectToDatabase } from './Utils/databaseClient.js';
import redisClient from './Utils/redisClient.js';

const app = express()
const PORT = process.env.FIT_PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(PORT, async () => {
    try {
        await connectToDatabase();
        await redisClient.connect();
        console.log("Backend running on port ", PORT);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit the process with an error code
    }
});

app.use('/', router);
export default app;