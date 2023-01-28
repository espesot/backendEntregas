import Cart from '../models/Cart.model.js'

class CartManagerDB {
  constructor() { }

  async getCarts(){
    try {
      const carts = await Cart.find({})
      return carts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId){
    try {
      const carts = await Cart.findById(cartId)
      return carts      
    } catch (error) {
      throw new Error(error.message) 
    }
  }

  async getProductCartId(cartId){
    try {
      const products = await Cart.findById(cartId).populate('items.product')
      return products
    } catch (error) {
      throw new Error(error.message)  
    }
  }

  async createCard(){
    try {
      const createCart = await Cart.create({})
      return createCart
    } catch (error) {
      throw new Error(error.message) 
    }
  }

  async addProductToCart(cartId,productId, quantity){
    try {
      const foundedCart = await Cart.findById(cartId)
      if(foundedCart){
        let updatedCart = await Cart.findOneAndUpdate({_id:cartId,'items.product':productId},{$inc:{'items.$.quantity': quantity}},{new:true}) 
        if(!updatedCart){
          updatedCart = await Cart.findOneAndUpdate({_id: cartId},{$push:{items:{product:productId, quantity:quantity}}},{new:true})
        }
        return updatedCart
      }
    } catch (error) {
      throw new Error(error.message) 
    }
  }

  async deleteCart(cartID){
    try {
      await Cart.delete({_id:cartID})
    } catch (error) {      
      throw new Error(error.message)
    }
  }

  async deleteProductTocart(cartId,productId){
    try {
      const foundedCart = await Cart.findById(cartId)
      if(foundedCart){
        let updatedCart = await Cart.findOneAndUpdate({_id: cartId, 'items.product': productId},{$inc:{'items.$.quantity': -1}},{new:true})
        return updatedCart
      }else{
        throw new Error('Error en Cartid')
      }
      
    } catch (error) {
      throw new Error(error.message)
    }    
  }

}


const cartsManagerDB = new CartManagerDB()
export default cartsManagerDB