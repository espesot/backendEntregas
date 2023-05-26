import Cart from '../models/CarritoModelo.js'

class CartManagerDB {
  constructor() { }

  async getCarts() {
    try {
      const carts = await Cart.find({}).lean()
      return carts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await Cart.findById(cartId).lean()
      return carts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductCartId(cartId) {
    try {
      const products = await Cart.findById(cartId).populate('items.product')
      return products
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createCard() {
    try {
      const createCart = await Cart.create({})
      return createCart
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const foundedCart = await Cart.findById(cartId)
      if (foundedCart) {
        let updatedCart = await Cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $inc: { 'items.$.quantity': quantity } }, { new: true })
        if (!updatedCart) {
          updatedCart = await Cart.findOneAndUpdate({ _id: cartId }, { $push: { items: { product: productId, quantity: quantity } } }, { new: true })
        }
        return updatedCart
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductsToCart(cartId, items) {
    try {
      let updatedCart = {}
      const foundedCart = await Cart.findById(cartId)
      if (foundedCart) {
        for await (const item of items) {
          updatedCart = await Cart.findOneAndUpdate({ _id: cartId, 'items.product': item.product }, { $inc: { 'items.$.quantity': item.quantity } }, { new: true })
          if (!updatedCart) {
            updatedCart = await Cart.findOneAndUpdate({ _id: cartId }, { $push: { items: { product: item.product, quantity: item.quantity } } }, { new: true })
          }
        }
        return updatedCart
      } else {
        throw new Error('error en el CartId o no encontrado')
      }
    } catch (error) {
      throw new Error('error al agregar prodcuto al carro')

    }
  }

  async deleteCart(cartID) {
    try {
      await Cart.delete({ _id: cartID })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProductTocart(cartId, productId) {
    try {
      const foundedCart = await Cart.findById(cartId)
      const foundedProduct = await Cart.findOne({ _id: cartId, 'items.prduct': productId })
      if (foundedCart) {
        if (foundedProduct) {
          await Cart.findOneAndUpdate({ _id: cartId, 'items.prduct': productId }, { $inc: { 'items.$.quantity': -1 } })
          let updatedCart = await Cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $pull: { items: { product: productId, quantity: 0 } } }, { new: true })

          if (updatedCart === null) {
            const currentCart = await Cart.findById(cartId)
            return currentCart
          } else {
            return updatedCart
          }
        } else {
          throw new Error('error o Producto no encontrado')
        }
      } else {
        throw new Error('Error en Cartid')
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

}


const cartsManagerDB = new CartManagerDB()
export default cartsManagerDB