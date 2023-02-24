import { Router } from 'express'
import { STATUS } from '../constants/constants.js'
import {checkSession} from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/current', checkSession, (req,res)=>{
  res.status(200).json({
    success: STATUS.SUCCESS,
    session: req.session
  })
})

export default router