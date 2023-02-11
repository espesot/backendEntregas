import { Router } from 'express'
import passport from '../utils/passport.utils.js'

const router = Router()

router.get('/fail',(req, res)=>{
  res.send('Fail')
})

router.get('/login', passport.authenticate('githubLogin', {
  scope:['user:email']
}))

router.get('/callback', passport.authenticate('githubLogin',{
  failureRedirect:'/api/github/fail'
}), (req,res)=>{
  req.session.logged = true
  req.session.user = req.user

  res.redirect('/')
})
export default router