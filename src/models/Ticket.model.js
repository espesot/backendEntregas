import { Schema, model } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'
import {v4 as uuidv4} from 'uuid'

const ticketSchema = new Schema({
  code:{
    type:String,
    required:true,
    default:uuidv4
  },
  purchaseDateTime:{
    type:Date,
    required:true,
    default: new Date()
  },
  amount:{
    type:Number,
    required:true,
  },
  purchaser:{
    type:String,
    required:true,
  },
},{
  timestamps:true
})
ticketSchema.plugin(mongooseDelete, {deletedAt:true})
ticketSchema.plugin(mongoosePaginate)
export const Tickets = model('Tickets', ticketSchema)
