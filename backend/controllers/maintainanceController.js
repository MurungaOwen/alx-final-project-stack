import maintenanceModel from "../models/maintenanceModel.js";
import userModel from "../models/userModel.js";
import redisClient from '../utils/redis.js';

export async function createMaintenance(req, res){
    // make a new maintenance request
    const { description, rentalID } = req.body;
    const token = req.headers['x-token'];
    try{
        const userID = await redisClient.get(`Auth_${token}`);
        const user = await userModel.getUserWithId(userID);
        const userPhone = user.phonenumber;
        const newMaintenance = await maintenanceModel.createMaintenance(userPhone,rentalID ,description);
        return res.status(201).json({sucess: "Maintenance sent successfully"});
    } catch(err){
        return res.status(500).json({error: "We could not process your request at the moment"});
    }
}

export async function getMaintenanceOfRental(req, res) {
    const { rentalID } = req.params;
    try{
        const rental = await maintenanceModel.getMaintenanceWithRental(rentalID);
        return res.status(200).json({rental});
    } catch(error) {
        return res.status(500).json({error});
    }
}

export async function userMaintenance(req, res) {
    const token = req.headers['x-token'];
    try{
        const userID = await redisClient.get(`Auth_${token}`);
        const user = await userModel.getUserWithId(userID);
        const maintenance = await maintenanceModel.getMaintenanceOfUser(user.phonenumber);
        return res.status(200).json({maintenance});
    } catch(error) {
        return res.status(500).json({error: "we could not process yur request"});
    }
}

export async function updateMaintenance(req, res) {
    const { content } = req.body;
    const { maintenanceID } = req.params;
    try{
        const maintenance = await maintenanceModel.updateMaintenance(maintenanceID, content);
        return res.status(200).json({success: "updated", main});
    } catch(err){
        return res.status(500).json({err});
    }
}

export async function deleteMaintenance(req, res) {
    const maintenanceID = req.params.maintenanceID;
    try{
        await maintenanceModel.deleteMaintenanceById(maintenanceID);
        return res.status(200).json({success: "Deleted successfully"});
    } catch(err){
        return res.status(500).send({err});
    }
}