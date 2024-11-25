import { compareSync, genSaltSync, hashSync } from 'bcrypt'

export function hashPassword(pass: string){
    const salt = genSaltSync();
    return hashSync(pass, salt);
}

export function checkPassword(pass: string, passHash: string){
    return compareSync(pass, passHash);
}

export function generateRandomTokenPassword(){
    const crypto = require('crypto');
    return crypto.randomBytes(60).toString('base64url');
}