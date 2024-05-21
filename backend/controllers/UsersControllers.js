import { error } from 'console';
import { v4 } from 'uuid';
import redisClient from '../utils/redis';
const dbClient = require('../utils/db');
const crypto = require('crypto');

function hashpassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

export async function RegisterUser(req, res){
    // TODO: find if user already exists and if not add them to db
    const { email, password, role } = req.body;
    if(!email) {
        return res.status(400).send({"error": "Enter Email"});
    }
    if(!role) {
        return res.status(400).send({"error": "Add the role e.g Tenant, Owner, Painter"});
    }
    if(!password) {
        return res.status(400).send({"error": "ENter password"});
    }

    const user = await dbClient.getUserWithEmail(email);

    if (!user) {
        const hashedPassword = hashpassword(password);
        const user = await dbClient.createUser(email, hashedPassword, role);
        return res.status(201).send({"email": user.email, "id": user._id});
    }
    // user exists
    return res.status(400).send({"error": "User with the email already exists"});

}

export async function Login(req, res) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({error: 'Missing Authorisation header'});

    const [ scheme, encoded ] = authHeader.split(' ');
    if (scheme !== 'Basic') return res.status(400).json({error: 'Invalid encoding scheme'});

    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const [ email, password ] = decoded.split(':');

    const user = await dbClient.getUserWithEmail(email);
    if (!user) return res.status(404).json({error: 'User with the email does not exist'});

    const loginHash = hashpassword(password);
    if (!(loginHash === user.password)) return res.status(401).json({error: 'Wrong password'});

    const token = v4();
    const redisKey = `Auth_${token}`;
    const redisValue = user._id.toString();
    await redisClient.set(redisKey, redisValue, 120000);

    return res.status(201).json({message: 'Login succesfull'});
}