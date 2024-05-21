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

    async getUserWithEmail(email) {
        // get user based on email
        const db = this.client.db(this.database);
        const userCollection = db.collection('users');
        return await userCollection.findOne({email: email});
    }

    async createUser(email, password, role) {
        // create a new user
        const db = this.client.db(this.database);
        const userCollection = db.collection('users');
        return await userCollection.insertOne({email: email, password: password, role: role});
    }

}

const DbClient = new Db();
module.exports = DbClient;