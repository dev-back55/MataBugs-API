import { Router } from 'express';
const router = Router();
// Middlewares
import auth from '../middlewares/auth.js';
// Controllers
import { signIn, signUp } from '../controllers/auth.controllers.js';

router.post('/login', signIn);
router.post('/signup', signUp);

export default router