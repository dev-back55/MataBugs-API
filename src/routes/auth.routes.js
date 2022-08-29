import { Router } from 'express';
const router = Router();
// Middlewares
import auth from '../middlewares/auth.js';
// Controllers
import { signIn, signUp } from '../controllers/auth.controllers.js';

router.post('/api/signin', signIn);
router.post('/api/signup', signUp);

export default router