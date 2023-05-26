import cartModel from '../../models/Cart.model.js'


class CartMongo {
  constructor(cartModel) {
    this.cart = cartModel
  }

  async getCarts() {
    try {
      const carts = await this.cart.find({}).lean()
      return carts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.cart.findById(cartId).lean()
      return carts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductByCartId(cartId) {
    try {
      const products = await this.cart.findById(cartId).populate('items.product')
      return products
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createCart() {
    try {
      const createCart = await this.cart.create({})
      return createCart
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const foundedCart = await this.cart.findById(cartId)
      if (foundedCart) {
        let updatedCart = await this.cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $inc: { 'items.$.quantity': quantity } }, { new: true })
        if (!updatedCart) {
          updatedCart = await this.cart.findOneAndUpdate({ _id: cartId }, { $push: { items: { product: productId, quantity: quantity } } }, { new: true })
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
        throw new Error('error en el CartId o no encontrado')
      }
    } catch (error) {
      throw new Error('error al agregar prodcuto al carro')

    }
  }

  async deleteCart(cartID) {
    try {
      await this.cart.delete({ _id: cartID })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProductTocart(cartId, productId) {
    try {
      const foundedCart = await this.cart.findById(cartId)
      const foundedProduct = await this.cart.findOne({ _id: cartId, 'items.prduct': productId })
      if (foundedCart) {
        if (foundedProduct) {
          await this.cart.findOneAndUpdate({ _id: cartId, 'items.prduct': productId }, { $inc: { 'items.$.quantity': -1 } })
          let updatedCart = await this.cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $pull: { items: { product: productId, quantity: 0 } } }, { new: true })

          if (updatedCart === null) {
            const currentCart = await this.cart.findById(cartId)
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
export default new CartMongo(cartModel)