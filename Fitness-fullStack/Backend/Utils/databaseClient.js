import { MongoClient } from "mongodb";
import { createClient } from "redis";

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || '27017';
const DATABASE = process.env.DB_DATABASE || 'fitness';

const url = `mongodb://${HOST}:${PORT}`;

let client;
let db;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(DATABASE);
        return db;
    }
};

export const getDatabase = async () => {
    if (!db) {
        db = await connectToDatabase();
    }
    return db;
};


