import { STATUS } from '../constants/constants.js'
import factory from '../services/factory.js'
import { getProductsMocks } from '../mocks/products.mock.js'

export const getProducts = async (req, res) => {
  try {
    //const products = await productManager.getProducts()
    // const { products, metadata } = await productManagerDB.getProducts(req.query)
    const { products, metadata } = await factory.products.getProducts(req.query)
    res.status(200).json({
      status: STATUS.SUCCESS,
      payload: products,
      ...metadata
    })
  } catch (error) {
    res.status(500).json({
      status: STATUS.SUCCESS,
      message: error.message
    })

  }
}

export const getProductbyId = async (req, res) => {
  try {
    let { pid } = req.params
    //const foundedProduct = await productManager.getProductbyId(Number(pid))
    if (pid) {
      const foundedProduct = await factory.products.getProductbyId(pid)
      res.status(200).json({
        success: true,
        product: foundedProduct
      })

    }else{
      res.status(400).json({
        success: false,
        message:'error o prodcuto no encontrado'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const postProduct = async (req, res) => {
  try {
    const product = req.body
    const savedProduct = await factory.products.createProduct(product)
    const productsList = await factory.products.getProducts()
    req.io.emit('products', productsList)

    res.status(201).json({
      success: true,
      message: 'Producto Creado',
      product: savedProduct
    })
  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}


export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid
    const data = req.body

    const updatedProduct = await factory.products.updateProdcut(pid, data)



    const productsList = await factory.products.getProducts()
    req.io.emit('products', productsList)

    res.status(200).json({
      success: true,
      message: 'producto modificado',
      updatedProduct: updatedProduct
    })
  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const deleteProductById = async (req, res) => {
  try {
    const { pid } = req.params
    //await productManager.deleteProduct(Number(req.params.pid))
    await factory.products.deleteProduct(pid)

    //const productsList = await productManagerFs.getPrducts()
    const productsList = await factory.products.getProducts()
    req.io.emit('products', productsList)

    res.status(200).json({
      success: true,
      message: 'Producto Eliminado'
    })
  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const mockProduct = async(req,res) =>{
  try {
    const product = getProductsMocks(100)

    res.status(200).json({
      success:STATUS.SUCCESS,
      product
    })
  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}