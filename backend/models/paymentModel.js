import { getDatabase } from "../utils/db";

class Payment{
    constructor() {
        this.collectionName = 'payment';
    }

    async addPayment(mpesaCode, Amount, PhoneNumber, house) {
        const db = getDatabase()
        const collection = db.collection(this.collectionName);
        return await collection.insertOne({
            mpesaCode,
            Amount,
            PhoneNumber,
            house,
            paid_at: new Date()
        })
    }

    async getUserPaymentDetails(PhoneNumber) {
        const db = getDatabase()
        const collection = db.collection(this.collectionName);
        return await collection.findone({PhoneNumber})
    }

    async getPaymentWithrentalID(rentalID) {
        const db = getDatabase()
        const collection = db.collection(this.collectionName);
        return await collection.findone({rentalID})
    }

    async updatePaymentData(idObject, updatedObject) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        return await collection.replaceOne(idObject, updatedObject);
    }
}

const paymentModel = new Payment()
export default paymentModel;