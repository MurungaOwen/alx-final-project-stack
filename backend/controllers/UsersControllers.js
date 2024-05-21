import DbClient from '../utils/db';

const dbClient = require('../utils/db');

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
        const exists = await dbClient.getUserWithPhone(phonenumber);

        if (!exists) {
            const hashedPassword = dbClient.encryptPassword(password);
            const newUser = await dbClient.createUser(firstname, lastname, phonenumber, hashedPassword, role);
            return res.status(201).send({"phonenumber": phonenumber, "id": newUser.ops[0]._id});
        }
        // user exists
        return res.status(400).send({"error": "User with the phone number is already registerd"});

    } catch (error) {
        return res.status(500).send({"error": "can\'t process your request at the moment"});
    }
}

export async function ChangeUserPassword(req, res){
    // TODO: change user password: token needs to be extracted to update data
    const { oldpassword, newPassword } = req.body;
}