import mongoose from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import mongoosPaginate from 'mongoose-paginate-v2'



const productSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  code:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  status:{
    type: Boolean,
    required: true
  },
  stock:{
    type: Number,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  thumbnails:{
    type: [String],
    required:true
  },
}, {timestamps:true})

productSchema.plugin(MongooseDelete,{deletedAt:true})
productSchema.plugin(mongoosPaginate)
const productModel = mongoose.model('Products', productSchema)
export default productModel