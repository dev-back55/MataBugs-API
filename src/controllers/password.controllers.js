import { secret, expires, rounds } from '../auth.js';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import Player from './../models/Player.js';
import dotenv from "dotenv";

dotenv.config()

export async function recoverPassword(email){
    let playerInDb = await Player.findOne({where:{email}})
    if(!playerInDb)throw new Error("that user does not exist");

    let token = jwt.sign({ player: playerInDb }, secret, {expiresIn: expires});
   
    return {msg:"We have sent an email to your mailbox so that you can update your password", token:token}
}

export async function updatePassword(password, token){
    if(!password) throw new Error("you must send a password");
    if(!(5 < password.length)) throw new Error("the password must have more than 5 characters");
    if(!(password.length < 256)) throw new Error("the password is too long");

    let playerInDb;
    
    jwt.verify(token, secret, (error, decoded) => {
        if(error) throw new Error('That user does not exist')
        playerInDb = decoded.player
    })

    password = hashSync(password, Number.parseInt(rounds));
    await Player.update({password},{where:{id : playerInDb.id}})

    return ("the password has been updated successfully")
}

export async function changePassword(id, oldPassword, newPassword) {
    if (!/^[1-9][0-9]*$/.test(id)) throw new Error("invalid id");
    if (!oldPassword || !newPassword) throw new Error("invalid params");
    if(!(5 < newPassword.length)) throw new Error("the new password must have more than 5 characters");
    if(!(newPassword.length < 256)) throw new Error("the new password is too long");

    let findUserById = await Player.findByPk(id);
    if (!findUserById) throw new Error("invalid user");

    if (!compareSync(oldPassword, findUserById.password)) throw new Error("The current password is incorrect");

    await findUserById.update({ password: hashSync(newPassword, Number.parseInt(rounds)) }, { where: { id: id } });
    return 'password updated';
}

export default {
    recoverPassword,
    updatePassword,
    changePassword
}