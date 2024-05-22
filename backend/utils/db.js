// import { MongoClient, ObjectId } from 'mongodb'
// import crypto from 'crypto'
// // get environmental variables
// const HOST = process.env.DB_HOST || 'localhost';
// const PORT = process.env.DB_PORT || '27017';
// const DATABASE = process.env.DB_DATABASE || 'rafiki';

// const url = `mongodb://${HOST}:${PORT}`;

// class Db{
//     constructor() {
//         this.client = new MongoClient(url, { useUnifiedTopology: true });
//         this.client.connect();
//         this.database = DATABASE;
//         this.host = HOST;
//     }

//     async getUserWithPhone(phonenumber) {
//         // get user based on phone number
//         const db = this.client.db(this.database);
//         const userCollection = db.collection('users');
//         return await userCollection.findOne({phonenumber});
//     }

//     async createUser(firstname, lastname, phonenumber, password, role) {
//         // create a new user
//         const db = this.client.db(this.database);
//         const userCollection = db.collection('users');
//         return await userCollection.insertOne({
//             firstname, lastname, phonenumber, password, role,
//             created_at: new Date(),
//             updated_at: new Date()
//         });
//     }

//     encryptPassword(password) {
//         const hash = crypto.createHash('sha256');
//         hash.update(password);
//         return hash.digest('hex');
//     }

//     async checkPassword(phonenumber, password) {
//         // match the phone number with password
//         const db = this.client.db(this.database);
//         const userCollection = db.collection('users');
//         // return true if passwords match
//         const user = await userCollection.findOne({phonenumber});
//         if(!user) return false;
//         return this.encryptPassword(password) === user.password;
//     }

//     async getUserWithId(id) {
//         // get user details from id
//         try {
//           const db = this.client.db(this.database);
//           const users = db.collection('users');
//           const result = await users.findOne({ _id: ObjectId(id) });
//           return result;
//         } catch (err) {
//           throw Error('Error occured while finding user in "users" collection');
//         }
//       }

//     async updateValue(idObject, updatedObject) {
//         try {
//           const db = this.client.db(this.database);
//           const userCollection = db.collection('users');
//           return await userCollection.replaceOne(idObject, updatedObject);
//         } catch (err) {
//           throw Error('Error occured while updating users');
//         }
//       }

// }

// const DbClient = new Db();
// export default DbClient

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
