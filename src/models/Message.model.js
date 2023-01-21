import mongoose from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required:true
  },
  message: {
    type: String,
    required:true
  },
},{timestamps:true})

messageSchema.plugin(MongooseDelete,{deletedAt:true})
const messageModel = mongoose.model('Message',messageSchema)

export default messageModel