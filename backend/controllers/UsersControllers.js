import { v4 } from 'uuid';
const { ObjectId } = require("mongodb")
import redisClient from '../utils/redis';
import DbClient from '../utils/db';



export async function RegisterUser(req, res){
    // TODO: find if user already exists and if not add them to db
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
        const exists = await DbClient.getUserWithPhone(phonenumber);

        if (!exists) {
            const hashedPassword = DbClient.encryptPassword(password);
            const newUser = await DbClient.createUser(firstname, lastname, phonenumber, hashedPassword, role);
            return res.status(201).send({"phonenumber": phonenumber, "id": newUser.ops[0]._id});
        }
        // user exists
        return res.status(400).send({"error": "User with the phone number is already registerd"});

    } catch (error) {
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

    const user = await DbClient.getUserWithPhone(phonenumber);
    if (!user) return res.status(404).json({error: 'User with the details is not registered'});

    const loginHash = DbClient.encryptPassword(password);
    if (!(loginHash === user.password)) return res.status(401).json({error: 'Wrong password'});

    const token = v4();
    const redisKey = `Auth_${token}`;
    const redisValue = user._id.toString();
    await redisClient.set(redisKey, redisValue, 120000);

    return res.status(201).json({message: 'Login succesfull', token});
}

export async function ChangeUserPassword(req, res){
    const { oldpassword, newPassword } = req.body;
    const token = req.headers['x-token'];

    if(!token) return res.status(403).send({"error": "missing Token"})

    
    // compare passwords
    try{
        const userID = await redisClient.get(`Auth_${token}`);
        if (!userID) return res.status(403).json({"error": "Invalid credentials"});

        const user = await DbClient.getUserWithId(userID);
        if(!user) return res.status(403).send({"error": "User Not found"});

        const passwordMatch = await DbClient.checkPassword(user.phonenumber, oldpassword)
        if(!passwordMatch) {
            return res.status(403).json({"error": "Incorrect password"});
        }
        // update user password
        user.password = DbClient.encryptPassword(newPassword);
        user.updated_at = new Date();
        await DbClient.updateValue({_id: ObjectId(user._id)}, user);
        return res.status(201).json({success: "password updated successfully"})

    } catch(error) {
        return res.status(500).json({"error": error})
    }
    
}