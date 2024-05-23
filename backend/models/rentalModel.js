import { getDatabase } from "../utils/db";
import { ObjectId } from "bson";


class RentalModel {
    constructor() {
        this.collectionName = 'rentals';
    }

    async createRental(rentalName, propertyId, units = [], created_at, updated_at) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.insertOne({
            rentalName,
            propertyId: ObjectId(propertyId),
            units,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    async getRentalWithId(rentalId) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.findOne({_id: ObjectId(rentalId)});
    }

    async getRentalWithPropertyId(propertyId) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.findOne({_id: ObjectId(propertyId)});
    }

    async deleteRentalwithId(rentalId) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.deleteOne({_id: ObjectId(rentalId)});
    }

    async deleteRentalwithPropertyId(propertyId) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.deleteOne({_id: ObjectId(propertyId)});
    }

    async updateValue(idObject, updatedObject) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.replaceOne(idObject, updatedObject);
    }

}

const rentalModel = new RentalModel();
export default rentalModel;