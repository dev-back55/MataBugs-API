import jwt from 'jsonwebtoken';
import { secret } from '../auth.js';
import Player from '../models/Player.js';
export default (req,res,next)=>{
    //comprobar la existencia del token
    if(!req.headers.authorization){
        res.status(401).json({msg:'Access Denied'})
    }else{
        //comprobar la validez de este token
        let token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, secret, (err,decoded)=>{
            if(err){
                res.status(500).json({msg:'There was a problem decoding the token',err})
            }else{
                Player.findByPk(decoded.player.id).then(player => {
                    req.player = player;
                    next();
                })
            }
        })
    }
}