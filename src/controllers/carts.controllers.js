import cartsManagerDB from '../services/carts.mongo.services.js'
import {STATUS} from '../constants/constants.js'

export const postCart = async (req, res) => {
  try {
    //await cartManagerFs.createNewCart()
    const createCard = await cartsManagerDB.createCard()
    res.status(201).json({
      success: STATUS.SUCCESS,
      createCard: createCard,
      message:'Cart creada Ok'
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message:error.message
    })
  }
}

export const addProductToCart = async(req,res)=>{
  try {
    let{cid,pid}= req.params
    let{quantity} = req.body
    //await productManagerFs.getProductbyId(pid)
    //await cartManagerFs.addProductToCart(cid,pid)
    if(quantity){
      await cartsManagerDB.addProductToCart(cid,pid, quantity)

    }else{
      res.status(401).json({
        success: STATUS.FAIL,
        message: 'se requiere quantity'
      })
    }
    res.status(201).json({
      success: STATUS.SUCCESS,
      message:'Producto agregado al Cart'
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message:error.message
    })
  }
}

export const addProductsToCart = async(req,res)=>{
  try {
    let {cid} = req.params
    let {items} = req.body
    if(items && cid){
      const updatedCart = await cartsManagerDB.addProductsToCart(cid,items)
      res.status(201).json({
        success: STATUS.SUCCESS,
        message: 'producto agregado al Cart',
        updatedCart:updatedCart
      })
    }else{
      res.status(401).json({
        success:STATUS.FAIL,
        message: 'error al requiere params'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const deleteProductToCart = async(req,res)=>{
  try {
    let{cid,pid}= req.params
    const updatedCart = await cartsManagerDB.deleteProductToCart(cid,pid)

    res.status(201).json({
      success: STATUS.SUCCESS,
      updatedCart: updatedCart,
      message: 'Producto Eliminado del Cart'
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const getProductByCartId = async (req,res)=>{
  try {
    const cid = req.params.cid
    const prodcuts = await cartsManagerDB.getProductCartId(cid)

    res.status(201).json({
      success: STATUS.SUCCESS,
      products:prodcuts
    })
  } catch (error) {
    res.status(500).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}