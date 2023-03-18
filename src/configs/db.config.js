import mongoose from 'mongoose'
import configs from './app.configs.js'


const dbConnect = async () =>{
  try {
    console.log('[Conecting to DB ⚡️')
    mongoose.set('strictQuery', false)
    await mongoose.connect(configs.mongoUri || '')    
    console.log('DB Connected')
  } catch (error) {
    console.log(error)
  }
}
export default dbConnect
