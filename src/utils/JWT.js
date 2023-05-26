import jwt from 'jsonwebtoken'
import config from '../configs/app.js'

export const generateToken = (email) =>{
  const token = jwt.sign({email}, config.jwtSecret,{expiresIn:'3600s'})
  return token
}

export const verifyToken= async(token)=>{
  try {
    const isValid = jwt.verify(token, config.jwtSecret)
    if(isValid){
      return true
    }else{
      throw new Error('Token invalido o expiro')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getExpirationDate= (token)=>{
  const decodedToken = jwt.decode(token)
  const expirationDate = new Date(decodedToken.exp *1000)

  return expirationDate
}