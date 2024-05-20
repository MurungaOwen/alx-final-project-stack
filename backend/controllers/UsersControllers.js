const dbClient = require('../utils/db');
const crypto = require('crypto');

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
        const hash = crypto.createHash('sha256');
        const hashedPassword = hash.update(password);
        const user = await dbClient.createUser(email, hashedPassword, role);
        return res.status(201).send({"email": user.email, "id": user._id});
    }
    // user exists
    return res.status(400).send({"error": "User with the email already exists"});

}