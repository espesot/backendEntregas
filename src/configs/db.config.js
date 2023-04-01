import mongoose from 'mongoose'
import configs from './app.configs.js'
import logger from '../utils/logger.utils.js'


const dbConnect = async () =>{
  try {
    logger.info('[Conecting to DB ⚡️')
    mongoose.set('strictQuery', false)
    await mongoose.connect(configs.mongoUri || '')    
    logger.info('DB Connected')
  } catch (error) {
    logger.error(error)
  }
}
export default dbConnect
