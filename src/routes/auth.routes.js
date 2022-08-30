import { Router } from 'express';
const router = Router();
// Middlewares
import auth from '../middlewares/auth.js';
// Controllers
import { signIn, signUp } from '../controllers/auth.controllers.js';

router.post('/login', signIn);
router.post('/signup',async (req,res)=>{
    try {
        let {nickname, email, avatar, password} = req.body
        res.json(await signUp(nickname, email, avatar, password))
    } catch (error) {
        res.status(500).json(error.message);
    }
});

export default router