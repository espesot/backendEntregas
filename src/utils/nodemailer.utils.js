import { createTransport } from 'nodemailer'
import configs from '../configs/app.configs.js'
import * as jwtUtils from './jwt.utils.js'

export const sendEmail = async(email)=>{
  try {
    const token = jwtUtils.generateToken(email)
    const expirationDate = jwtUtils.getExpirationDate(token)

    const transportGmail = createTransport({
      service:'gmail',
      port:587,
      auth:{
        user: configs.gmailUser,
        pass: configs.gmailAppPass
      }
    })
    const emailOptions ={
      from: configs.gmailUser,
      to:email,
      subject: 'Link para restaurar Pass',
      text: `use el siguiente link ${expirationDate} : http://localhost:${configs.port}/api/restorePassword/?email=${email}&token${token}`
    }
    const result = await transportGmail.sendMail(emailOptions)
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}