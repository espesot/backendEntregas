import {User} from '../models/User.model.js'

export const createUser = async (data)=>{
  try {
    const foundedUser = await getUser(data.email)
    if(foundedUser){
      throw new Error('El usuario ya esta Registrado')
    }else{
      const createdUser = await User.create(data)
      return createdUser
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getUser = async (email)=>{
  try {
    const user = await User.findOne({email: email}).lean()
    return user
  } catch (error) {
    throw new Error('Error en busqueda de Usuario')
  }
}