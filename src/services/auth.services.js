import bcrypt from 'bcrypt'
import factory from '../services/factory.js'


export const login = async (email, password) => {
  try {
    const user = await factory.users.getUser(email)
    if(!user){
      throw new Error('Usuario no existe')
    }
    const isValid = bcrypt.compareSync(password, user.password)
    
    if(isValid){
      user.lastConnection = new Date()
      await factory.users.updateUser(email, user)
      return true
    }else{
      return false
    }
  } catch (error) {
    throw new Error(error.message)
  }
}