const dbClient = require('../utils/db');
const crypto = require('crypto');

function encryptPassword(password) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(password);
    const hashedPassword = sha1.digest('hex');
    return hashedPassword;
}

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
            const hashedPassword = encryptPassword(password)
            const newUser = await dbClient.createUser(firstname, lastname, phonenumber, hashedPassword, role);
            console.log(`new User: ${newUser.ops}`)
            return res.status(201).send({"email": email, "id": newUser.ops._id});
        }
        // user exists
        return res.status(400).send({"error": "User with the phone number is already registerd"});

    } catch (error) {
        return res.status(500).send({"error": "can\'t process your request at the moment"});
    }
}