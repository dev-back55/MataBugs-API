import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expires, rounds } from '../auth.js';
import Player from './../models/Player.js';

export async function signIn(req, res) {
    let { email, password } = req.body;

    await Player.findOne({
        where: {
            email: email
        }
    }).then(player => {
        if (!player) {
            res.status(404).json({ msg: "User with this email not found" });
        } else {
            if (compareSync(password, player.password)) {
                let token = jwt.sign({ player: player }, secret, {
                    expiresIn: expires
                });

                res.json({
                    player: player,
                    token: token
                });
            } else {
                res.status(401).json({ msg: "Incorrect password" });
            }
        }
    }).catch(err => {
        res.status(500).json(err);
    });
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
            password: hpassword
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