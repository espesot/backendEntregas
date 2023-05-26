import { Router } from 'express'
import { STATUS } from '../constants/constants.js'
import {isLogged} from '../middlewares/autorizacionMiddleware.js'
import SessionDTO from '../services/usersDAOs/sessionDTO.js'

const router = Router()

router.get('/current', isLogged, (req,res)=>{
  res.status(200).json({
    success: STATUS.SUCCESS,
    session: new SessionDTO(req.session)
  })
})

export default router