import { model, Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new Schema({
  firstName:{
    type: String,
    require:true
  },
  lastName:{
    type: String,
    require:true
  },
  email:{
    type: String,
    require:true,
    unique:true
  },
  password:{
    type: String,
    require:true
  },
  role:{
    type: String,
    require:true,
    default:'user'
  }
},
{
  timestamps:true
})

userSchema.plugin(mongooseDelete,{deletedAt:true})
userSchema.plugin(mongoosePaginate)

export const User = model('Users', userSchema)
