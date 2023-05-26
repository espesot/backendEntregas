import config from './app.js'
import mongoose from 'mongoose'
import logger from '../utils/loggerUtilis.js'

mongoose.set('strictQuery', false)
mongoose.connect(config.mongoUri, (err)=>{
  if(err){
    ('❌ Error ❌')
  }else{
    logger.info('⚡️ Conectado ⚡️')
  }
})

export default mongoose