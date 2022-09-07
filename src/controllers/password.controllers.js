import { secret, expires, rounds } from '../auth.js';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import Player from './../models/Player.js';
import dotenv from "dotenv";

dotenv.config()
const API_KEY = process.env.SENDGRID_API_KEY
const { CLIENT_URL } = process.env;

sgMail.setApiKey(API_KEY)

export async function recoverPassword(email){
    let playerInDb = await Player.findOne({where:{email}})
    if(!playerInDb)throw new Error("that user does not exist");

    let token = jwt.sign({ player: playerInDb }, secret, {expiresIn: expires});
   
    try {
        const msg = {
            to: email,
            from: "losmatabugs@gmail.com",
            subject:"Recover Password",
            text:"This email was requested to change your password, please do not share with anyone, if you have not requested it, you do not need to do anything",
            html:`<a href=${CLIENT_URL}/updatepassword/?token=${token}>Restore your password</a>`
        }
        await sgMail.send(msg);
    }
    catch(error) {
        console.log(error)
    }
    return "We have sent an email to your mailbox so that you can update your password"
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