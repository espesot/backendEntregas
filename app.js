import express from 'express'
import { ProductManager } from './espesotEntregable1'

const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('./product.json')

await productManager.cargaProduct()

app.get('/', (req, res) => {
  res.status(200).json({
    seccess: true,
    message: 'Conectado con Express Server'
  })
})

app.get('/products', async (req,res)=>{
  try{
    let {limit} = req.query
    limit = Number(limit)
    const products = await productManager.getPruduct()

    if(!isNaN(limit)){
      res.status(200).json({
        seccess:true,
        limit: products.slice(0,limit)
      })
    }else if (isNaN(limit)){
      res.status(400).json({
        success:false,
        message:'Debe ingresar un numero'
      })      
    } else{
      res.status(200).json({
        success:true,
        message:products
      })
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})

app.get('/products/:pid',async(req,res)=>{
  try{
    let {pid} = req.params
    if(!isNaN(pid)){
      const foundedProduct = await productManager.getProductByID(Number(pid))
      res.status(200).json({
        success:true,
        pid: foundedProduct
      })
    } else {
      res.status(400).json({
        success:false,
        message:'Error en busqueda de producto'
      })
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message: error.message
    })
  }

})

app.listen(8080,()=>{
  console.log(`[app.js]: server on port ${PORT}`)
})