import Player from "../models/Player.js"
import { hashSync } from 'bcrypt';
import { rounds } from '../auth.js';

export async function createPlayer(nickname, email, avatar, password, admin) {
  
    const findInDb = await Player.findOne({ where: { email } })
    if (findInDb) throw new Error('There is already a player with this email')
  
    let hpassword = hashSync(password, Number.parseInt(rounds));
    await Player.create({ nickname, email, avatar, admin, password: hpassword, status: "bronce" });
  
    return `the player ${nickname} was created successfully`;
}