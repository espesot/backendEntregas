import { STATUS } from '../constants/constants.js'
import factory from '../services/factory.js'
import { checkRequiredFiles } from '../utils/checkFiles.js'
import moment from 'moment'
import * as emailUtils from '../utils/nodeMailer.js'


export const createUser = async(req,res)=>{
  try {
    const data = req.body
    const createdUser =  await factory.users.createUser(data)
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
    const user = await factory.users.getUser(email)
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
    const updatedUser = await factory.users.updateUser(email,body,false)
    delete updatedUser.password

    res.status(200).json({
      status: STATUS.SUCCESS,
      updatedUser: updatedUser
    })
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      message: error.message
    })
  }
}

export const updatePassword = async(req,res)=>{
  try {
    const {email} = req.params
    const {body} = req
    const updatedUser = await factory.users.updateUser(email,body, true)
    res.status(200).json({
      status: STATUS.SUCCESS,
      updatedUser:updatedUser
    })
  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message:error.message
    })
  }
}

export const updateUserRole = async(req,res)=>{
  try {
    const {uid} = req.params
    await checkRequiredFiles(uid)
    let user = await factory.users.getUserById(uid)
    user.role = 'premium'
    
    const updatedUser = await factory.users.updateUser(user.email,user,false)
    delete updateUser.password
    res.status(200).json({
      status: STATUS.SUCCESS,
      updatedUser:updatedUser
    })
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      message:error.message
    })
  }
}

export const deleteInactiveUsers =async(req,res)=>{
  try {
    const users = await factory.users.getUsers(false)
    for await(const user of users){
      const days = moment().diff(moment(user.lastConnection), 'days')
      if(days>=days){
        await factory.users.deleteUser(user.id)
        emailUtils.sendDeleteAccountEmail(user.email)
      }
    }
    const result = await factory.users.getUsers(true)
    res.status(200).json({
      status:STATUS.SUCCESS,
      users: result
    })
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      message:error.message
    })   
  }
}

export const uploadFiles = async(req,res)=>{
  try {
    const {uid} = req.params
    const {file} = req
    const {fileName} = req
    let reference =''

    if(file.fildname === 'profile'){
      reference = `./uploads/profile/${fileName}`
    }else if(file.fildname === 'product'){
      reference = `./uploads/products/${fileName}`
    }else{
      reference = `./uploads/documents/${fileName}`
    }
    let user = await factory.users.getUserById(uid)
    user.documents.push({name:fileName,reference})
    user.status = 'files loaded'
    await factory.user.updateUser(user.email,user,false)

    res.status(201).json({
      status:STATUS.SUCCESS,
      message:'Archivo Cargado OK!!'
    })
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      message:error.message
    })   
  }
}

export const deleteUser = async(req,res)=>{
  try {
    const {email} = req.params
    const user  = await factory.users.getUsers(email)
    await factory.users.deleteUsers(user.id)
    res.status(200).json({
      status:STATUS.SUCCESS,
      users: 'ususario Eliminado'
    })
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      message:error.message
    })   
  }
}
export const getUsers = async(req,res)=>{
  try {
    const users = await factory.users.getUsers(true)
    res.status(200).json({
      status:STATUS.SUCCESS,
      users: users
    })
  } catch (error) {
    res.status(500).json({
      status:STATUS.FAIL,
      message:error.message
    })   
  }
}