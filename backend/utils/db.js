const { MongoClient, ObjectId } = require('mongodb');

// get environmental variables
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || '27017';
const DATABASE = process.env.DB_DATABASE || 'rafiki';

const url = `mongodb://${HOST}:${PORT}`;

class Db{
    constructor() {
        this.client = MongoClient(url, { useUnifiedTopology: true });
        this.client.connect();
        this.database = DATABASE;
        this.host = HOST;
    }

}
const DbClient = new Db();
module.exports = DbClient;