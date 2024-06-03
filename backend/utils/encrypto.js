import crypto from 'crypto';

// Function to generate a salt
export const generateSalt = (length = 16) => {
    return crypto.randomBytes(length).toString('hex');
};

// Function to hash the password with the salt
export const encryptPassword = (password, salt) => {
    const hash = crypto.createHash('sha1');
    hash.update(password + salt);
    return hash.digest('hex');
};

export function verifyPassword(password, salt, storedHash) {
    const hashedPassword = encryptPassword(password, salt);
    console.log(`hash passwd entered: ${hashedPassword}`);
    console.log(`hash passwd in db: ${storedHash}`);
    return hashedPassword === storedHash;
}