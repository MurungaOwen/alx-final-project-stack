import redis from 'redis';


class RedisCache{
    constructor() {
        this.client = redis.createClient();
    }

    async get(key){
        // get a value stored in redis cache
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }


    async set(key, value, durationInSeconds) {
        // set value for a key and also time for expiry
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', durationInSeconds, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async del(key) {
        // delete a value stored in redis cache
        return new Promise((resolve, reject) => {
            this.client.del(key, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
}

const redisClient = new RedisCache();
export default redisClient;
