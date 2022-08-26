import { Router } from 'express';
import { PlayersPrint } from './../controllers/players.controllers.js';

const router = Router();

router.get('/players', PlayersPrint)

export default router;