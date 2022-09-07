import { Router } from "express";
import cors from "cors";
import {getHallOfFame, searchPlayers, createPlayer, updatePlayer, deletePlayerById } from '../controllers/players.controllers.js';
import auth from '../middlewares/auth.js';


const router = Router();
const whitelist = ['http://15.229.74.105:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.get("/hallOfFame", cors(corsOptions), async (_, res) => {
  try {
    res.status(200).json(await getHallOfFame());
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/search", cors(corsOptions), async (req, res) => {
  try {
    let data = req.query;
    res.status(200).json(await searchPlayers(data));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/createPlayer", auth, async (req, res) => {
  try {
    let data = req.body;
    res.status(200).json(await createPlayer(data));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put("/player", auth, async (req, res) => {
  try {
    let data = req.body;
    let id = req.player.id
    res.status(200).json(await updatePlayer(id, data));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/player/:id", auth,async(req,res)=>{
  try {
    let{id}=req.params;
    res.status(200).json(await deletePlayerById(id))
  } catch (error) {
    res.status(404).send(error.message);
  }
})

export default router;