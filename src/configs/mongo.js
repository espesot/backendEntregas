import config from './app.configs.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
mongoose.connect(config.mongoUri, (err)=>{
  if(err){
    console.log('❌ Error ❌')
  }else{
    console.log('⚡️ Conectado ⚡️')
  }
})

export default mongoose