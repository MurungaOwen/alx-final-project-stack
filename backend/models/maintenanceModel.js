import { getDatabase } from "../utils/db.js";
import { ObjectId } from "bson";


class Maintenance{
    constructor() {
        this.collectionName = 'maintenance';
    }

    async createMaintenance(userID, rentalID, content ){
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.insertOne({
            userID,
            rentalID,
            content,
            sent_at : new Date()
        });
    }

    async getMaintenanceWithRental(rentalID) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.find({rentalID});
    }

    async getMaintenanceOfUser(userID) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.find({ userID });
    }

    async updateMaintenance(idObject, updatedObject) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.update(
            {_id: ObjectId(idObject)},
            {$set: {content: updatedObject}}
        );
    }

    async deleteMaintenanceById(maintenanceID) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.deleteOne({_id: ObjectId(maintenanceID)});
    }

}

const maintenanceModel = new Maintenance();
export default maintenanceModel