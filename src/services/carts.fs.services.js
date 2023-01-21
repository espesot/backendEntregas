import fs from 'fs'

class CartManagerFs {
  constructor(path) {
    this.carts = []
    this.path = path
  }

  async createNewCart() {
    try {
      await this.#readCarts()
      const newCart = {
        id: this.#getMaxId + 1,
        products: []
      }
      this.carts.push(newCart)
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts), 'utf-8')
    } catch (error) {
      throw new Error('Error')
    }

  }

  async addProductToCart(cartId, productId) {
    try {
      this.#readCarts()
      const cart = await this.getCartById(cartId)
      const cartIndex = this.carts.findIndex((cart) => cart.id === cartId)
      const productindex = cart.products.findIndex((el)=> el.product === productId)
      if(productindex!== -1){
        this.carts[cartIndex].products[productindex].quantity++
      }else{
        const product ={
          product: productId,
          quantity:1
        }
        this.carts[cartIndex].products.push(product)
      }
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts),'utf-8')
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCarts(){
    try {
      await this.#readCarts()
      return this.carts
    } catch (error) {
      throw new Error('error al leer los archivis')
    }
  }

  async getCartById(cartId) {
    try {
      await this.#readCarts()
      const foundedCart = this.carts.find((cart) => cart.id === cartId)
      if (foundedCart) {
        return foundedCart
      } else {
        throw new Error('Cart no encontrado')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  #getMaxId() {
    let maxID = 0
    this.carts.map((cart) => {
      if (cart.id > maxID) maxID = cart.id
    })
    return maxID
  }

  async #readCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        this.carts = carts
      } else {
        this.carts = []
      }
    } catch (error) {
      throw new Error('Error al leer archivos')
    }
  }


}
const cartManagerFs =  new CartManagerFs('./src/store/carts.json')
export default cartManagerFs