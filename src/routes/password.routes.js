import { Router } from 'express';
import { recoverPassword, updatePassword } from '../controllers/password.controllers.js';
const router = Router();

router.post('/password', async(req,res)=>{
    try{
        let { email  } = req.body
        res.json(await recoverPassword(email))
    }catch(error){
        res.json(error.message)
    }
})

router.put('/password', async(req,res)=>{
    try{
        let { password, token } = req.body
        res.json(await updatePassword(password, token))
    }catch(error){
        res.json(error.message)
    }
})
export default router;