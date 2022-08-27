import { Router } from 'express';
import {getHallOfFame, searchPlayers, createPlayer, updatePlayer} from '../controllers/players.controllers.js';

const router = Router();

router.get("/hallOfFame", async (_, res) => {
    try {
      res.status(200).send(await getHallOfFame());
    } catch (error) {
      res.status(404).send(error);
    }
  });
  
  router.get("/search", async (req, res) => {
    try {
      let data = req.query
      res.status(200).send(await searchPlayers(data));
    } catch (error) {
      res.status(404).send(error);
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      let data = req.body;
      res.status(200).send(await createPlayer(data));
    } catch (error) {
      res.status(404).send(error);
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      let { id } = req.params;
      let data = req.body;
      res.status(200).send(await updatePlayer(id, data));
    } catch (error) {
      res.status(404).send(error);
    }
  });

export default router;