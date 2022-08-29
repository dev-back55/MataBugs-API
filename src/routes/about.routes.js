import { Router } from "express";
const router = Router();

import {getGameInfo, getTeamInfo } from '../controllers/about.controllers.js';

router.get("/game", async (req, res) => {
  try {
    res.status(200).send(await getGameInfo());
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/mataBugsTeam", async (req, res) => {
  try {
    res.status(200).send(await getTeamInfo());
  } catch (error) {
    res.status(404).send(error);
  }
});

export default router;
