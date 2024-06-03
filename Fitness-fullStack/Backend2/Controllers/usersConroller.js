import { v4 } from "uuid";
import { encryptPassword, comparePassword } from "../Utils/passwordManager.js";
import userModel from "../Models/userModel.js";
import redisClient from "../Utils/redisClient.js";


export async function RegisterUser(req, res){
    const { username, email, password} = req.body;

    if(!username) return res.status(400).json({error: 'Missing username'});
    
    if(!email) return res.status(400).json({error: 'Missing email'});

    if(!password) return res.status(400).json({error: 'Missing password'});
    try {
        const exists = await userModel.getUserWithEmail(email);

        if (!exists) {
            const hashedPassword = await encryptPassword(password);
            const newUser = await userModel.createUser(username, email, hashedPassword);
            return res.status(201).json({message: 'User registered successfully'})
        }
        // user exists
        return res.status(400).json({error: 'User Already exists'});

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Cannot process user registration right now'});
    }
}

export async function Login(req, res) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({error: 'Missing Authorisation header'});

    const [ scheme, encoded ] = authHeader.split(' ');
    if (scheme !== 'Basic') return res.status(400).json({error: 'Invalid encoding scheme'});

    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const [ email, password ] = decoded.split(':');
    try{
        const user = await userModel.getUserWithEmail(email);
        if (!user) return res.status(404).json({error: 'User does not exist'});
    
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) return res.status(401).json({error: 'Incorrect password'});
    
        const token = v4();
        const redisKey = `Auth_${token}`;
        const redisValue = user._id.toString();
        await redisClient.set(redisKey, redisValue, 120000);

        const response = {
            message: 'Login succesfull',
            user_id: user._id,
            token: redisKey,
            user: user
        }
    
        return res.status(201).json(response);
    } catch(err){
        console.log(err);
        return res.status(400).json({message: "error processing request"});
    }
    
}