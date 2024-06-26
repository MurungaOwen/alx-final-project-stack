import redisClient from "../Utils/redisClient.js";
import exerciseModel from "../Models/exerciseModel.js";
import fitnessProgram from "../Models/programsModel.js";

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

export async function createFitnessProgram(req, res){
    const { userId, programName, bodyPart, hoursPerWeek, daysPerWeek } = req.body;

    if (!userId) return res.status(400).json({error: 'user id is required'});

    const newProgram = await fitnessProgram.createNewProgram(userId, programName, bodyPart, hoursPerWeek, daysPerWeek);
    if (newProgram.acknowledged) res.status(201).json({message: 'Program created succesfully'});
}

export async function getFitnessProgram(req, res){
    const { userId } = req.params;

    if (!userId) {
        console.log('No user id');
        return res.status(400).json({error: 'User id is required'});
    }

    const programs = await fitnessProgram.getUserPrograms(userId);
    if (!programs) return res.status(500).json({message: 'User has not created any programs'});

    return res.status(200).json(programs);
}

export async function removeProgram(req, res){
    const { program_id } = req.params;

    if (!program_id) return res.status(400).json({error: 'Program id is missing'});

    const deleted = await fitnessProgram.deleteProgram(program_id);

    if (!deleted.acknowledged) return res.status(500).json({error: 'Program does not exist'});

    return res.status(200).json({message: 'Program deleted succesfully'});
}

export async function editProgram(req, res){
    const { program_id } = req.params;
    const program = req.body;

    if (!program_id) return res.status(400).json({error: 'Program id is missing'});
    if (!program) return res.status(400).json({error: 'Update object is missing'});
    
    delete program._id;

    const updated = await fitnessProgram.updateProgram(program_id, program);

    if (!updated.acknowledged) return res.status(500).json({error: 'Program does not exist'});

    return res.status(200).json({message: 'Program updated succesfully'});
}