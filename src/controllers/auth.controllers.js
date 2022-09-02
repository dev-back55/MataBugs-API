import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expires, rounds } from '../auth.js';
import Player from './../models/Player.js';

export async function signIn(email, password) {
    let loginPlayer = await Player.findOne({
        where: {
            email: email
        }
    })
    if (!loginPlayer) {
        throw new Error("Wrong password or email") 
    } else {
        console.log(loginPlayer)
        if (compareSync(password, loginPlayer.dataValues.password)) {
            let token = jwt.sign({ player: loginPlayer }, secret, {
                expiresIn: expires
            });

            return{
                player: loginPlayer,
                token: token
            };
        } else {
            throw new Error("wrong password or email")
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
        return {
            player: player,
            token: token,
            msg: 'player create successfully'
        };
    } else {
        return 'There is already a player with this email'
    }
}