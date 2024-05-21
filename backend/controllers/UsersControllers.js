import { v4 } from 'uuid';
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
    const [ email, password ] = decoded.split(':');

    const user = await DbClient.getUserWithEmail(email);
    if (!user) return res.status(404).json({error: 'User with the email does not exist'});

    const loginHash = DbClient.encryptPassword(password);
    if (!(loginHash === user.ops[0].password)) return res.status(401).json({error: 'Wrong password'});

    const token = v4();
    const redisKey = `Auth_${token}`;
    const redisValue = user.ops[0]._id.toString();
    await redisClient.set(redisKey, redisValue, 120000);

    return res.status(201).json({message: 'Login succesfull'});
}

export async function ChangeUserPassword(req, res){
    // TODO: change user password: token needs to be extracted to update data
    const { oldpassword, newPassword } = req.body;
}