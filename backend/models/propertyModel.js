import { getDatabase } from "../utils/db";
import { ObjectId } from "bson";


class PropertyModel {
    constructor() {
        this.collectionName = 'properties';
    }

    async createProperty(propertyName, ownerId, details = '') {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.insertOne({
            propertyName,
            ownerId: ObjectId(ownerId),
            details,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    async getAll() {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.find();
    }

    async getPropertyWithId(propertyId) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.findOne({_id: ObjectId(propertyId)});
    }

    async getPropertyWithOwnerId(ownerId) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.findOne({ownerId: ObjectId(ownerId)});
    }

    async updateValue(idObject, updatedObject) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.replaceOne(idObject, updatedObject);
    }

    async deletePropertyWithId(propertyId) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.deleteOne({_id: ObjectId(propertyId)});
    }

    async deletePropertyWithOwnerId(OwnerId) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.deleteOne({_id: ObjectId(OwnerId)});
    }
}

const propertyModel = new PropertyModel();
export default propertyModel;