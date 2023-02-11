import bcrypt from 'bcrypt'
import * as userServices from './users.services.js'



export const login = async (email, password) => {
  try {
    const user = await userServices.getUser(email)
    if(!user){
      throw new Error('Usuario no existe')
    }
    const isValid = bcrypt.compareSync(password, user.password)
    
    if(isValid){
      return true
    }else{
      return false
    }
  } catch (error) {
    throw new Error('Error de login')
  }
}