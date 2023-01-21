import mongoose, { Schema } from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}
, {_id: false })
const cartSchema = new Schema({
  item:[{
    type: cartItemSchema,
    default:[]
  }]
},{timestamps:true})

cartSchema.plugin(MongooseDelete, { deletedAt: true })

const cartModel = mongoose.model('Cart', cartSchema)
export default cartModel