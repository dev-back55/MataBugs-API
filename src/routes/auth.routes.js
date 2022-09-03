import { Router } from 'express';
const router = Router();
// Middlewares
import auth from '../middlewares/auth.js';
// Controllers
import { signIn, signUp } from '../controllers/auth.controllers.js';

router.post('/login', async(req,res)=>{
    try {
        let { email, password } = req.body;
        res.json(await signIn(email, password))
    } catch (error) {
        res.status(404).json(error.message)
    }
});

router.post('/signup',async (req,res)=>{
    try {
        let {nickname, email, avatar, password} = req.body
        res.json(await signUp(nickname, email, avatar, password))
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/logout", (req, res) => {
    if (req.logout) req.logout();
    res.status(201).json({
      success: true
    })
  });

export default router


