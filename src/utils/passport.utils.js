import passport from 'passport'
import passportLocal from 'passport-local'
import passportGitHub from 'passport-github2'

import { User } from '../models/User.model.js'
import * as authServices from '../services/auth.services.js'
import * as userService from '../services/users.services.js'
import configs from '../configs/app.configs.js'
import factory from '../services/factory.js'

passport.serializeUser(function (user, done) {
  console.log('Serializando')
  done(null, user._id)
})

passport.deserializeUser((_id, done)=>{
  console.log('Deserealizando')
  User.findById(_id, (err,user)=>{
    done(err,user)
  })
})

passport.use('singup', new passportLocal.Strategy({passReqToCallback:true, usernameField:'email'},async(req, username,password, done)=>{
  try {
    const userExist = await User.findOne({email:username})
    if(userExist){
      return done('usuario existente', false)
    }else{
      const user = await userService.createUser(req.body)
      return done(null, user)
    }
  } catch (error) {
    return done(error.message,false)
  }
}))

passport.use('login', new passport.Strategy({passReqToCallback:true, usernameField:'email'}, async(req, username, password, done)=>{
  try {
    const login = await authServices.login(username,password)
    if(login){
      const user = await User.findOne({email:username})
      return done(null, user)
    }else{
      return done ('erroren logueo', false)
    }
  } catch (error) {
    return done(error.message, false)
  }
}))

passport.use('github', new passportGitHub.Strategy({
  clientID: configs.gitHub.clientId,
  clientSecret: configs.gitHub.clientSecret,
  callbackURL: 'http://localhost:3000/api/github/callback'
}, async(accessToken, refreshToken, profile, done)=>{
  try {
    const newUser ={
      first_name: profile.displayName,
      last_name: profile.displayName,
      age:20,
      email:profile._json.email
    }
    const user = await factory.users.create(newUser)
    done(null,user)
  } catch (error) {
    throw new Error(error.message)
  }
}))

passport.use('githubLogin', new passportGitHub.Strategy({
  clientID: configs.gitHub.clientId,
  clientSecret: configs.gitHub.clientSecret,
  callbackURL:'http://localhost:3000/api/github/callback'
}, async(accessToken, refreshToken, profile, done)=>{
  try {
    const user = await User.findOne({email: profile._json.email})
    return done(null, user)
  } catch (error) {
    throw new Error(error.message)
  }
}))

export default passport