import { Router } from 'express'
import passport from '../utils/passport.utils.js'
import { STATUS } from '../constants/constants.js'

const router = Router()

router.get('/fail', (req, res) => {
  console.log('Fail')

  res.status(401).json({
    success:false,
    message:'Error en passport'
  })
})


router.post('/singup', passport.authenticate('singup',{
  failureRedirect:'/api/passportLocal/fail'
}), (req,res)=>{
  res.status(200).json({
    success: STATUS.SUCCESS,
    message: 'usuario creado ok',
    createdUser: req.user
  })
})


router.post('/login', passport.authenticate('login',{
  failureRedirect:'/api/passportLocal/fail'
}), (req,res)=>{
  req.session.logged = true
  req.session.user = req.user
  res.status(200).json({
    success: STATUS.SUCCESS,
    message: 'ususario logueado OK',
    loggedUser: req.session.user
  })
})

export default router