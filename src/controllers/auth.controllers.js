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
export async function signUp(req, res) {
    //encriptamos password
    let password = hashSync(req.body.password, Number.parseInt(rounds));
    //crear un usuario
    // Crear un usuario
    let findPlayer = await Player.findAll({
        where: {
            email: req.body.email
        }
    });
    if (findPlayer.length === 0) {
        await Player.create({
            nickname: req.body.nickname,
            email: req.body.email,
            avatar: req.body.avatar,
            password: password
        }).then(player => {
            let token = jwt.sign({ player: player }, secret, {
                expiresIn: expires
            });
            res.json({
                player: player,
                token: token
            });
        }).catch(err => {
            res.status(500).json(err.message);
        });
    }
}