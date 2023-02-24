import { STATUS } from '../constants/constants.js'
import * as usersService from '../services/users.services.js'

export const createUser = async(req,res)=>{
  try {
    const data = req.body
    const createdUser =  await usersService.createUser(data)
    delete createdUser.password
    res.status(201).json({
      success: STATUS.SUCCESS,
      message: 'Usuario creado OK',
      createdUser
    })

  } catch (error) {
    res.status(500).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}


export const getUser = async (req,res)=>{
  try {
    const {email} = req.query
    const user = await usersService.getUser(email)
    delete user.password
    res.status(200).json({
      success: STATUS.SUCCESS,
      user:user
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const updateUser = async(req,res)=>{
  try {
    const {email} = req.params
    const {body} = req
    const updatedUser = await usersService.updateUser(email,body,false)
    delete updatedUser.password

    res.status(200).json({
      success: true,
      updatedUser: updatedUser
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message
    })
  }
}

export const updatePassword = async(req,res)=>{
  try {
    const {email} = req.params
    const {body} = req
    const updatedUser = await usersService.updateUser(email,body, false)
    res.status(200).json({
      success:true,
      updatedUser:updatedUser
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}