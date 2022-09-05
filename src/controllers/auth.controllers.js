import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expires, rounds } from '../auth.js';
import Player from './../models/Player.js';
import sgMail from '@sendgrid/mail';
import dotenv from "dotenv";

dotenv.config()

const API_KEY = process.env.SENDGRID_API_KEY
export const image = 'https://res.cloudinary.com/techmarket/image/upload/v1662155306/WhatsApp_Image_2022-09-01_at_08.20.50_ihe7np.jpg'

sgMail.setApiKey(API_KEY)

export async function signIn(email, password) {
    let loginPlayer = await Player.findOne({
        where: {
            email: email
        }
    })
    if (!loginPlayer) {
        throw new Error("Wrong password or email")
    } else {
        if (loginPlayer.isactive === false) {
            throw new Error('The action could not be performed. Maybe you have been banned')
        } else {
            if (compareSync(password, loginPlayer.password)) {
                let token = jwt.sign({ player: loginPlayer }, secret, {
                    expiresIn: expires
                });
                return {
                    player: loginPlayer,
                    token: token
                };
            } else {
                throw new Error("wrong password or email")
            }
        }
    }
}


export async function signUp(nickname, email, avatar, password) {
    //encriptamos password
    let hpassword = hashSync(password, Number.parseInt(rounds));
    //crear un usuario
    // Crear un usuario
    let findPlayer = await Player.findAll({
        where: {
            email: email
        }
    });
    if (findPlayer.length === 0) {
        const player = await Player.create({
            nickname: nickname,
            email: email,
            avatar: avatar,
            password: hpassword,
            status: "bronce"
        })
        let token = jwt.sign({ player: player }, secret, {
            expiresIn: expires
        });
        try{
            const msg = {
                to: email,
                from: "losmatabugs@gmail.com",
                subject: "Successful Registration",
                text: "Welcome, you have successfully registered",
                html: `<h1>Welcome ${nickname} to Bugs Hunters- Hall Of Fame</h1><img src=${image} alt="" />`
                
            }
            await sgMail.send(msg);
        }catch(err){
            console.log(err)
        }
        return {
            player: player,
            token: token,
            msg: 'player create successfully'
        };
    } else {
        return 'There is already a player with this email'
    }
}