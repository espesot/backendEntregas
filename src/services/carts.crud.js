export default class CartsCRUD {

  constructor(cartModel) {
    this.cart = cartModel
  }

  async getCarts() {
    try {
      const cart = await this.cart.find({}).lean()
      return cart
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await this.cart.findById({ cartId }).lean()
      return cart
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductsByCartId(cartId) {
    try {
      const products = await this.cart.findById(cartId).populate('item.product')
      return products
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createCart() {
    try {
      const createdCart = await this.cart.create({})
      return createdCart
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const foundedCart = await this.cart.findById(cartId)
      if (foundedCart) {
        let updatedCart = await this.cart.findOneAndUpdate({ _id: cartId, 'item.product': productId }, { $inc: { 'item.$.quantity': quantity } }, { new: true })
        if (!updatedCart) {
          updatedCart = await this.cart.findOneAndUpdate({ _id: cartId }, { $push: { items: { product: productId, quantity: quantity } } }, { new: true })
        }
        return updatedCart
      } else {
        throw new Error('error en CartId')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductstoCart(cartId, items) {
    try {
      let updatedCart = {}
      const foundedCart = await this.cart.findById(cartId)
      if (foundedCart) {
        for await (const item of items) {
          updatedCart = await this.cart.findOneAndUpdate({ _id: cartId, 'items.product': item.product }, { $inc: { 'items.$.quantity': item.quantity } }, { new: true })
          if (!updatedCart) {
            updatedCart = await this.cart.findOneAndUpdate({ _id: cartId }, { $push: { items: { product: item.product, quantity: item.quantity } } }, { new: true })
          }
        }
        return updatedCart
      } else {
        throw new Error('Error en CartId')
      }
    } catch (error) {
      throw new Error('Error en producId')
    }
  }

  async deleteProductToCart(cartId, productId) {
    try {
      const foundedCart = await this.cart.findById(cartId)
      const foundedProduct = await this.cart.findOne({ _id: cartId, 'items.product': productId })
      if (foundedCart) {
        if (foundedProduct) {
          await this.cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $inc: { 'items.$.quality': -1 } })
          let updatedCart = await this.cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $pull: { items: { product: productId, quantity: 0 } } }, { new: true })

          if (updatedCart === null) {
            const currentCart = await this.cart.findById(cartId)
            return currentCart
          } else {
            return updatedCart
          }
        } else {
          throw new Error('Error en product ID')
        }
      } else {
        throw new Error('Error en Cart ID')

      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteCart(cartId){
    try {
      await this.cart.delete({_id:cartId})
    } catch (error) {
      throw new Error(error.message)
    }
  }

}