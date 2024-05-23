import { getDatabase } from "../utils/db";
import { ObjectId } from "bson";


class Payment{
    constructor() {
        this.collectionName = 'payment';
    }

    async makePayment(userPhone, amount, rentalID) {
        const db = getDatabase();
        const collection = db.collection(this.collectionName);
        const pay_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';
        
    }

}