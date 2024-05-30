import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/main.js';
import { connectToDatabase, connectToRedis} from './utils/db.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.set('port', PORT);
app.use(express.json()); // use json form

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.listen(app.get('port'), async () => {
    try {
        await connectToDatabase();
        await connectToRedis(); // Connect to Redis
        console.log("Backend running on port ", PORT);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit the process with an error code
    }
});

app.use('/', routes);

export default app