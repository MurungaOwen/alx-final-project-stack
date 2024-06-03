import { getDatabase } from "../Utils/databaseClient.js";
import { ObjectId } from "mongodb";


class ExerciseModel{
    constructor() {
        this.collection = 'exercises';
    }
    async getExerciseByBodyParts(bodyPart) {
        try {
            const db = await getDatabase();
            const collection = db.collection(this.collection);

            const exercises = await collection.find({bodyPart: bodyPart}).toArray();

            return exercises;
          } catch (error) {
            console.error('Error querying exercises:', error);
            throw error;
          }
        
    }
}

const exerciseModel = new ExerciseModel();
export default exerciseModel;