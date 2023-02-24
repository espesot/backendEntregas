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
    require:true,
    minLenght: 6
  },
  email:{
    type: String,
    require:true,
    unique:true
  },
  age:{
    type: Number,
    required: true,
    min: [1,'edad mayor a uno']
  },
  password:{
    type: String,
    require:true
  },
  cartId:{
    type: Schema.Types.ObjectId,
    ref: 'Carts',
    required: true
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
