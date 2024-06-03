import { getDatabase } from "../Utils/databaseClient.js";
import { ObjectId } from "mongodb";

class UserModel {
    constructor() {
        this.collectionName = 'users';
    }

    async getUserWithEmail(email) {
        const db = await getDatabase();
        const userCollection = db.collection(this.collectionName);
        return await userCollection.findOne({ email });
    }

    async createUser(username, email, password) {
        const db = await getDatabase();
        const userCollection = db.collection(this.collectionName);
        return await userCollection.insertOne({
            username,
            email,
            password: password,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    async getUserWithId(id) {
        const db = await getDatabase();
        const userCollection = db.collection(this.collectionName);
        return await userCollection.findOne({ _id: ObjectId(id) });
    }

    async updateValue(idObject, updatedObject) {
        const db = await getDatabase();
        const userCollection = db.collection(this.collectionName);
        return await userCollection.replaceOne(idObject, updatedObject);
    }
}

const userModel = new UserModel();
export default userModel;
