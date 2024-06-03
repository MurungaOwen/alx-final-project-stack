import redisClient from "../Utils/redisClient.js";
import exerciseModel from "../Models/exerciseModel.js";

export async function getExercise(req, res){
    const { body_part } = req.params;
    if(!body_part) return res.status(400).json({error: 'Missing body part'});

    try{
        const response = await exerciseModel.getExerciseByBodyParts(body_part);
        if (!response) return res.status(504).json({error: 'body part does not exist'});
        return res.status(200).json(response);
    }
    catch(err){
        console.log(err);
    }
}