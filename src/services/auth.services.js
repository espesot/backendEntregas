import bcrypt from 'bcrypt'
import factory from '../services/factory.js'


export const login = async (email, password) => {
  try {
    const user = await factory.user.getUser(email)
    if(!user){
      throw new Error('Usuario no existe')
    }
    const isValid = bcrypt.compareSync(password, user.password)
    
    if(isValid){
      user.lastConnection = new Date()
      await factory.user.updateUser(email,user)
      return true
    }else{
      return false
    }
  } catch (error) {
    throw new Error('Error de login')
  }
}