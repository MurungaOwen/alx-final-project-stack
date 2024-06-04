import { getDatabase } from "../Utils/databaseClient.js";
import { ObjectId } from "mongodb";


class FitnessProgram{
    constructor(){
        this.collection = 'fitnessPrograms';
    }

    async createNewProgram(userId, programName, bodyPart, hoursPerWeek, daysPerWeek ){
        const db = await getDatabase();
        const collection = db.collection(this.collection);
        return await collection.insertOne({
            user_id: new ObjectId(userId),
            programName,
            bodyPart,
            hoursPerWeek,
            daysPerWeek
        });
    }

    async getUserPrograms(userId){
        const db = await getDatabase();
        const collection = db.collection(this.collection);
        return await collection.find({user_id: new ObjectId(userId)}).toArray();
    }

    async deleteProgram(programId){
        const db = await getDatabase();
        const collection = db.collection(this.collection);
        return await collection.deleteOne({_id: new ObjectId(programId)});
    }

    async updateProgram(programId, update){
        const db = await getDatabase();
        const collection = db.collection(this.collection);
        return await collection.updateOne({_id: new ObjectId(programId)}, {$set: update});
    }
}

const fitnessProgram = new FitnessProgram();
export default fitnessProgram;