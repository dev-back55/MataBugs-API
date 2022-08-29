import User from '../models/User.js';
import { compareSync, hashSync } from 'bcrypt';
import sign from 'jsonwebtoken';
import { secret, expires, rounds } from '../auth.js';

export async function signIn(req, res) {
    let { email, password } = req.body;

    await User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) {
            res.status(404).json({ msg: "User with this email not found" });
        } else {
            if (compareSync(password, user.password)) {
                let token = sign({ user: user }, secret, {
                    expiresIn: expires
                });

                res.json({
                    user: user,
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
    let findUser = await User.findAll({
        where: {
            email: req.body.email
        }
    });
    if (findUser.length === 0) {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {
            let token = sign({ user: user }, secret, {
                expiresIn: expires
            });
            res.json({
                user: user,
                token: token
            });
        }).catch(err => {
            res.status(500).json(err.message);
        });
    }
}