import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || '27017';
const DATABASE = process.env.DB_DATABASE || 'rafiki';

const url = `mongodb://${HOST}:${PORT}`;

let client;
let db;

export const connectToDatabase = async () => {
    if (!client) {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      db = client.db(DATABASE);
    }
    return db;
};

export const getDatabase = () => {
    if (!db) throw new Error('Database not connected');
    return db;
};
