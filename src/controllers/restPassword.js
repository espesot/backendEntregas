import bcrypt from 'bcrypt'
import {STATUS} from '../constants/constants.js'
import * as emailutil from '../utils/nodeMailer.js'
import * as jwtUtil from '../utils/JWT.js'
import factory from '../services/factory.js'

export const sendEmail = async(req,res)=>{
  try {
    const {email} = req.body
    const result = await emailutil.sendEmail(email)
    if(result){
      res.status(200).json({
        status: STATUS.SUCCESS
      })
    }else{
      throw new Error('error al enviar emial')
    }
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      menssage: error.menssage
    })
  }
}

export const view = async(req,res)=>{
  try {
    const {token} = req.query
    const isValid = await jwtUtil.verifyToken(token)
    if(isValid){
      res.render('restorePassword',{})
    }else{
      res.render('login',{})
    }
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      menssage: error.menssage
    })
  }
}

export const restore = async (req,res)=>{
  try {
    const {email,password}=req.body
    if(email === ''|| password ===''){
      throw new Error('email y pass vacios')
    }
    const user = await factory.users.getUser(email)
    if(bcrypt.compareSync(password,user.password)){
      throw new Error('la contraseña debe ser diferente a la actual')
    }
    user.password = password
    const updatedUser = await factory.users.updatedUser(email,user,true)
    res.status(200).json({
      status:STATUS.SUCCESS,
      updatedUser:updatedUser
    })
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      menssage: error.menssage
    })
  }
}