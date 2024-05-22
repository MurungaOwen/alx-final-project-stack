import { getDatabase } from '../utils/db.js';
import { ObjectId } from 'mongodb';
import { encryptPassword } from '../utils/encrypto.js';

class UserModel {
    constructor() {
        this.collectionName = 'users';
    }

    async getUserWithPhone(phonenumber) {
        const db = getDatabase();
        const userCollection = db.collection(this.collectionName);
        return await userCollection.findOne({ phonenumber });
    }

    async createUser(firstname, lastname, phonenumber, password, role) {
        const db = getDatabase();
        const userCollection = db.collection(this.collectionName);
        const encryptedPassword = encryptPassword(password);
        return await userCollection.insertOne({
        firstname,
        lastname,
        phonenumber,
        password: encryptedPassword,
        role,
        created_at: new Date(),
        updated_at: new Date()
        });
    }

    async checkPassword(phonenumber, password) {
        const db = getDatabase();
        const userCollection = db.collection(this.collectionName);
        const user = await userCollection.findOne({ phonenumber });
        if (!user) return false;
        return encryptPassword(password) === user.password;
    }

    async getUserWithId(id) {
        const db = getDatabase();
        const userCollection = db.collection(this.collectionName);
        return await userCollection.findOne({ _id: ObjectId(id) });
    }

    async updateValue(idObject, updatedObject) {
        const db = getDatabase();
        const userCollection = db.collection(this.collectionName);
        return await userCollection.replaceOne(idObject, updatedObject);
    }
}

const userModel = new UserModel();
export default userModel;
