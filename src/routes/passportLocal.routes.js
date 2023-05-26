import { Router } from 'express'
import passport from '../utils/passport.utils.js'
import { STATUS } from '../constants/constants.js'

const router = Router()

router.get('/fail', (req, res) => {
  console.log('Fail')

  res.status(401).json({
    success:STATUS.FAIL,
    message:'Error en passport'
  })
})


router.post('/singup', passport.authenticate('singup',{
  failureRedirect:'/api/passportLocal/fail'
}), (req,res)=>{
  res.redirect('/')
})


router.post('/login', passport.authenticate('login',{
  failureRedirect:'/api/passportLocal/fail'
}), (req,res)=>{
  req.session.logged = true
  req.session.user = req.user
  res.redirect('/')

})

export default router