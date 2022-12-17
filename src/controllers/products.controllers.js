import { ProductManager } from '../services/products.services.js'

const productManager = new ProductManager('./src/store/prodcuts.json')

export const getPrducts = async (req, res) => {
  try {
    const {limit} = req.query
    const products = await productManager.getProducts()

    if(!isNaN(limit)){
      res.status(200).json({
        sussess:true,
        limit:products.slice(0,Number(limit))
      })
    }else if (limit && isNaN(limit)){
      res.status(400).json({
        success:false,
        message:'Limite no es un numero'
      })
    }else{
      res.status(200).json({
        success:true,
        products:products
      })
    }
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })

  }
}

export const getProductbyId = async (req,res)=>{
  try {
    let{pid}= req.params
    if(!isNaN(pid)){
      const foundedProduct =await productManager.getProductbyId(Number(pid))
      res.status(200).json({
        success:true,
        product: foundedProduct
      })
    }else{
      res.status(400).json({
        success:false,
        message:'Producto no encontrado'
      })
    }
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const postProduct = async (req,res)=>{
  try {
    const product = req.body
    await productManager.addProducts(product)

    res.status(201).json({
      success:true,
      message:'Producto Creado',
      product:product
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


export const updateProduct = async(req,res)=>{
  try {
    const pid = req.params.pid
    const updatedProduct = req.body
    await productManager.updateProduct(Number(pid), updatedProduct)

    res.status(200).json({
      success:true,
      message:'producto modificado',
      updatedProduct: updatedProduct
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const deleteProductById = async(req,res)=>{
  try {
    await productManager.deleteProduct(Number(req.params.pid))
    res.status(200).json({
      success:true,
      message:'Producto Eliminado'
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}