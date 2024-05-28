import { v4 } from 'uuid';
import { ObjectId } from 'mongodb';
import redisClient from '../utils/redis.js';
import userModel from '../models/userModel.js';
import { encryptPassword } from '../utils/encrypto.js';


export async function RegisterUser(req, res){
    const { firstname, lastname, phonenumber, password, role} = req.body;
    if(!firstname || !lastname) {
        return res.status(400).send({"error": "Enter both names"});
    }
    if(!role) {
        return res.status(400).send({"error": "Add the role e.g Tenant, Owner, Painter"});
    }
    if(!phonenumber) {
        return res.status(400).send({"error": "Enter phone number"});
    }
    if(!password) {
        return res.status(400).send({"error": "Enter password"});
    }
    try {
        const exists = await userModel.getUserWithPhone(phonenumber);

        if (!exists) {
            const hashedPassword = encryptPassword(password);
            const newUser = await userModel.createUser(firstname, lastname, phonenumber, hashedPassword, role);
            return res.status(201).json({"phonenumber": phonenumber, "id": newUser.insertedId});
        }
        // user exists
        return res.status(400).send({"error": "User with the phone number is already registered"});

    } catch (error) {
        console.log(error)
        return res.status(500).send({"error": "can\'t process your request at the moment"});
    }
}

export async function Login(req, res) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({error: 'Missing Authorisation header'});

    const [ scheme, encoded ] = authHeader.split(' ');
    if (scheme !== 'Basic') return res.status(400).json({error: 'Invalid encoding scheme'});

    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const [ phonenumber, password ] = decoded.split(':');
    try{
        const user = await userModel.getUserWithPhone(phonenumber);
        if (!user) return res.status(404).json({error: 'User with the details is not registered'});
    
        const loginHash = encryptPassword(password);
        if (!(loginHash === user.password)) return res.status(401).json({error: 'Wrong password'});
    
        const token = v4();
        const redisKey = `Auth_${token}`;
        const redisValue = user._id.toString();
        await redisClient.set(redisKey, redisValue, 120000);
    
        return res.status(201).json({message: 'Login succesfull', token: token});
    } catch(err){
        return res.status(400).json({message: "error processing request"});
    }
    
}
export async function ChangeUserPassword(req, res){
    const { oldpassword, newPassword } = req.body;
    const token = req.headers['x-token'];

    if(!token) return res.status(403).send({"error": "missing Token"})

    
    // compare passwords
    try{
        const userID = await redisClient.get(`Auth_${token}`);
        if (!userID) return res.status(403).json({"error": "Invalid credentials"});

        const user = await userModel.getUserWithId(userID);
        if(!user) return res.status(403).send({"error": "User Not found"});

        const passwordMatch = await userModel.checkPassword(user.phonenumber, oldpassword)
        if(!passwordMatch) {
            return res.status(403).json({"error": "Incorrect password"});
        }
        // update user password
        user.password = encryptPassword(newPassword);
        user.updated_at = new Date();
        await userModel.updateValue({_id: ObjectId(user._id)}, user);
        return res.status(201).json({success: "password updated successfully"})

    } catch(error) {
        return res.status(500).json({"error": error})
    }
    
}