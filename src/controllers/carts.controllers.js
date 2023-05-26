import { STATUS } from '../constants/constants.js'
import factory from '../services/factory.js'


export const postCart = async (req, res) => {
  try {
    //await cartManagerFs.createNewCart()
    const createdCard = await factory.carts.createCart()
    res.status(201).json({
      success: STATUS.SUCCESS,
      createCard: createdCard,
      message: 'Cart creada Ok'
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const addProductToCart = async (req, res) => {
  try {
    let { cid, pid } = req.params
    let { quantity } = req.body

    const user = req.session.user
    if(user.role === 'premium'){
      const foundedProduct = await factory.products.getProductById(pid)
      if(foundedProduct.owner === 'admin'){
        throw new Error('el usuario PREMIUM solo puede eliminar los productos')
      }
      if (foundedProduct.owner._id.toString() !== user.id){
        throw new Error('el usuario PREMIUM solo puede eliminar los productos')
      }
    }

    if (quantity) {
      await factory.carts.addProductToCart(cid, pid, quantity)
    } else {
      res.status(401).json({
        success: STATUS.FAIL,
        message: 'se requiere quantity'
      })
    }
    res.status(201).json({
      success: STATUS.SUCCESS,
      message: 'Producto agregado al Cart'
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const addProductsToCart = async (req, res) => {
  try {
    let { cid } = req.params
    let { items } = req.body
    if (items && cid) {
      const updatedCart = await factory.carts.addProductsToCart(cid, items)

      res.status(201).json({
        success: STATUS.SUCCESS,
        message: 'producto agregado al Cart',
        updatedCart: updatedCart
      })
    } else {
      res.status(401).json({
        success: STATUS.FAIL,
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

export const deleteProductToCart = async (req, res) => {
  try {
    let { cid, pid } = req.params
    const updatedCart = await factory.carts.deleteProductToCart(cid, pid)

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

export const getProductsByCartId = async (req, res) => {
  try {
    const cid = req.params.cid
    const prodcuts = await factory.carts.getProductsByCartId(cid)

    res.status(201).json({
      success: STATUS.SUCCESS,
      products: prodcuts
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const purchase = async (req, res) => {
  try {
    let {cid} = req.params
    let purchase ={
      status:false,
      purchaser:'',
      amount:0
    }
    const cart = await factory.carts.getCartById(cid)
    const user = await factory.carts.getUserByCartId(cid)
    purchase.purchaser = user.email

    for await(const item of cart.items){
      const product = await factory.prodcuts.getProductById(item.product)
      if(item.quantity <= product.stock){
        product.stock -= item.quantity
        purchase.amount += product.price * item.quantity
        purchase.status = true
        await factory.products.updateProduct(product.id, product)
        for(let i =0; i<item.quantity;i++){
          factory.carts.deleteProductToCart(cid, item.product)
        }
      }
    }
    const ticket = await factory.tickets.createTicket(purchase)
    res.status(200).json({
      success: STATUS.SUCCESS,
      message: 'Purchase terminado OK',
      ticket
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }

}

