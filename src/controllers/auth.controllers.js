import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expires, rounds } from '../auth.js';
import Player from './../models/Player.js';
import sgMail from '@sendgrid/mail';
import dotenv from "dotenv";

dotenv.config()

const avatareimg = "https://cdn-icons-png.flaticon.com/256/4105/4105459.png"
const API_KEY = process.env.SENDGRID_API_KEY
export const image = 'https://res.cloudinary.com/techmarket/image/upload/v1662155306/WhatsApp_Image_2022-09-01_at_08.20.50_ihe7np.jpg'

sgMail.setApiKey(API_KEY)

export async function signIn(email, password) {
  let loginPlayer = await Player.findOne({where:{email}})
  if(!loginPlayer.isactive) throw new Error("the player is banned") 

  if (!loginPlayer) throw new Error("Wrong password or email") 
  if (!compareSync(password, loginPlayer.password)) throw new Error("wrong password or email")
  
  let token = jwt.sign({ player: loginPlayer }, secret, {expiresIn: expires});

  return{player: loginPlayer,token};
}


export async function signUp(nickname, email, avatar, password) {
  if(!nickname || !email || !password) throw new Error('You must complete the required fields')
  let findPlayer = await Player.findAll({where:{email}});
  if (findPlayer.length !== 0) throw new Error('There is already a player with this email')

  let hpassword = hashSync(password, Number.parseInt(rounds))
  if(avatar.length===0) avatar = avatareimg
  let playerCreated = await Player.create({nickname, email, avatar, password:hpassword, status:"bronce"})
  let token = jwt.sign({ player: playerCreated }, secret, {expiresIn: expires});

  try{
    const msg = {
      to: email,
      from: "losmatabugs@gmail.com",
      subject: "Successful Registration",
      text: "Welcome, you have successfully registered",
      html: `<h1>Welcome ${nickname} to Bugs Hunters- Hall Of Fame</h1><img src=${image} alt="" />`}
    await sgMail.send(msg);
  } catch(err){console.log(err)}

  return {player: playerCreated, token: token, msg: 'player create successfully'} 
}

export function refreshPlayer(id, player) {
  if (!player || player.id !== id) throw new Error("INVALID USER ID");
  if (!player.isactive) throw new Error("BANNED");
  else return player;
}