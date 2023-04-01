import config from './app.configs.js'
import mongoose from 'mongoose'
import logger from '../utils/logger.utils.js'

mongoose.set('strictQuery', false)
mongoose.connect(config.mongoUri, (err)=>{
  if(err){
    ('❌ Error ❌')
  }else{
    logger.info('⚡️ Conectado ⚡️')
  }
})

export default mongoose