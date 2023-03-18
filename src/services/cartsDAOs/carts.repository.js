import CartDTO from './carts.dto.js'

export class CartRepository{
  constructor(dao){
    this.dao = dao
  }

  async getCarts(){
    try {
      const carts = await this.dao.getCarts()
      return carts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId){
    try {
      const cart = await this.dao.getCartById(cartId).lean()
      const cartDTO = new CartDTO(cart)
      return cartDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductByCartId(cartId){
    try {
      const product = await this.dao.getProductByCartId(cartId)
      return product
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async createCart(){
    try {
      const createdCart = await this.dao.createCart()
      const cartDTO = new CartDTO(createdCart)
      return cartDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async addProductToCart(cartId, productId, quantity){
    try {
      const updatedCart = await this.dao.addProductToCart(cartId, productId, quantity)
      const cartDTO = new CartDTO(updatedCart)
      return cartDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductsToCart(cartId,items){
    try {
      const updatedCart = await this.dao.addProductsToCart(cartId, items)
      const cartDTO = new CartDTO(updatedCart)
      return cartDTO
    } catch (error) {
      throw new Error('error al agregar productos')
    }
  }

  async deleteProductToCart(cartId, productId){
    try {
      const updatedCart = await this.dao.deleteProductToCart(cartId, productId)
      const cartDTO = new CartDTO(updatedCart)
      return cartDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteCart(cartId){
    try {
      await this.dao.deleteCart(cartId)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async purchase(cartId){
    try {
      const purchaseInfo = await this.dao.purchase(cartId)
      return purchaseInfo
    } catch (error) {
      throw new Error(error.message)
      
    }
  }
}