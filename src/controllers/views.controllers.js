//import productManager from '../services/products.services.js'
import productManagerDB from '../services/products.mongo.services.js'
import { STATUS } from '../constants/constants.js'


export const getHome = async (req, res) => {
  try {
    //const productsList = await productManager.getProducts()
    const productsList = (await productManagerDB.getProducts()).products
    res.render('index',{
      products: productsList
    })

  } catch (error) {
    res.status(500).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}

export const getProducts = async(req, res)=>{
  try {
    
    const {page} = req.query
    const data = await productManagerDB.getProducts({limit:2, page: page === undefined ? 1 : page, sort : 'asc', query:null})
    res.render('products',{...data})

  } catch (error) {
    res.status(500).json({
      success:STATUS.FAIL,
      message: error.message
    })
    
  }
}

export const getRealTimeProducts = async(req,res)=>{
  try {
    //const productsList = await productManager.getProducts()
    const productsList = (await productManagerDB.getProducts()).products
    res.render('realTimeProducts',{
      products: productsList
    })
  } catch (error) {
    res.status(500).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}

export const getChat = async(req,res)=>{
  try {
    res.render('chat',{})
  } catch (error) {
    res.status(500).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}