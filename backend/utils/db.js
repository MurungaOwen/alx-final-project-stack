import { MongoClient } from 'mongodb';
import redis from "redis";
import 'dotenv/config';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || '27017';
const DATABASE = process.env.DB_DATABASE || 'rafiki';

const url = `mongodb://${HOST}:${PORT}`;

let client;
let db;

export const connectToDatabase = async () => {
    if (!client) {
      client = new MongoClient(url);
      await client.connect();
      db = client.db(DATABASE);
    }
    return db;
};

export const getDatabase = () => {
    if (!db) throw new Error('Database not connected');
    return db;
};

// connect db
let redisDb;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

export const connectToRedis = async () => {
  try {
    if(!redisDb){
      redisDb = redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT,
      });
      redisDb.on('connect', () => {
          console.log('Connected to Redis');
      });

      redisDb.on('error', (error) => {
          console.error('Error connecting to Redis:', error);
      });
    }
    
    return redisDb;

  } catch (error) {
    console.error('Error connecting to Redis:', error);
    throw new Error('Redis connection failed');
  }
  
}

export const getRedisDb = async () => {
  await connectToRedis();
  if (!redisDb) {
      throw new Error('Redis client not connected');
  }
  return redisDb;
};
