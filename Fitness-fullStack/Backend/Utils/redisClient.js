import { createClient } from "redis";

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

class RedisClient {
  constructor() {
    this.client = createClient({
        url: `redis://${REDIS_HOST}:${REDIS_PORT}`
    });

    // Handle connection events
    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  async connect() {
    await this.client.connect();
    console.log('Connected to Redis');
  }

  // Set a key-value pair in Redis
  async set(key, value) {
    return await this.client.set(key, value);
  }

  // Get a value by key from Redis
  async get(key) {
    return await this.client.get(key);
  }

  // Close the Redis connection
  async quit() {
    await this.client.quit();
  }
}

const redisClient = new RedisClient()
export default redisClient;
