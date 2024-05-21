const { MongoClient, ObjectId } = require('mongodb');
const crypto = require('crypto');
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

    async getUserWithPhone(phonenumber) {
        // get user based on phone number
        const db = this.client.db(this.database);
        const userCollection = db.collection('users');
        return await userCollection.findOne({phonenumber});
    }

    async createUser(firstname, lastname, phonenumber, password, role) {
        // create a new user
        const db = this.client.db(this.database);
        const userCollection = db.collection('users');
        return await userCollection.insertOne({
            firstname, lastname, phonenumber, password, role,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    encryptPassword(password) {
        const sha1 = crypto.createHash('sha1');
        sha1.update(password);
        const hashedPassword = sha1.digest('hex');
        return hashedPassword;
    }

    async checkPassword(phonenumber, password) {
        // match the phone number with password
        const db = this.client.db(this.database);
        const userCollection = db.collection('users');
        // return true if passwords match
        const user = userCollection.findOne({phonenumber});
        return this.encryptPassword(password) === user.password
    }

}

const DbClient = new Db();
module.exports = DbClient;