import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbConnect = async () =>{
  try {
    console.log('Conecting to DB')
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.URL_DB || '')    
    console.log('DB Connected')
  } catch (error) {
    console.log(error)
  }
}
export default dbConnect
