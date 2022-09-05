import { secret, expires, rounds } from '../auth.js';
import { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import Player from './../models/Player.js';
import dotenv from "dotenv";
dotenv.config()
const API_KEY = process.env.SENDGRID_API_KEY
const { CLIENT_URL } = process.env;

sgMail.setApiKey(API_KEY)

export async function recoverPassword(email){
    let userInDb = await Player.findOne({where:{email}})
    if(!userInDb)throw new Error("that user does not exist");

    let token = jwt.sign({ user: userInDb }, secret, {expiresIn: expires});
   
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
    if(!(5 < password.length)) throw new Error("the password must have more than 5 characters");
    if(!(password.length < 256)) throw new Error("the password is too long");

    let userInDb;

    jwt.verify(token, secret, (error, decoded) => {
        if(error) throw new Error('That user does not exist')
        userInDb = decoded.user
    })

    password = hashSync(password, Number.parseInt(rounds));
    await User.update({password},{where:{id : userInDb.id}})

    return ("the password has been updated successfully")
}

export default{
    recoverPassword,
    updatePassword
}