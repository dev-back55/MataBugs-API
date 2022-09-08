import { Router } from "express";

import {getHallOfFame, searchPlayers, updatePlayer, deletePlayerById } from '../controllers/players.controllers.js';
import auth from '../middlewares/auth.js';


const router = Router();

router.get("/hallOfFame", async (_, res) => {
  try {
    res.status(200).json(await getHallOfFame());
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/search", async (req, res) => {
  try {
    let data = req.query;
    res.status(200).json(await searchPlayers(data));
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