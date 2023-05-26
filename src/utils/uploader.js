import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
export const __firename = dirname(__filename)

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    req.file = file
    if(file.fieldname === 'profile'){
      cb(null,`${__dirname}/../../uploads/profile`)
    }else if(file.filename === 'product') {
      cb(null, `${__dirname}/../..uploads/products`)
    }else{
      cb(null, `${__dirname}/../..uploads/documents`)
    }
  },
  filename:function(req,file,cb){
    req.fileName = `${Date.now()}-${file.originalname}` 
    cb(null ,req.fileName)
  }
})

export const uploader = multer({storage})