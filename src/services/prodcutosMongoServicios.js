import Product from '../models/productosModelo.js'
import _ from 'lodash'

class ProductManagerDB {
  constructor() { }

  async getProducts(params) {
    try {
      let result = []
      if (!_.isEmpty(params)) {
        const { limit, page, sort, query } = params
        if (query) {
          result = await Product.paginate({...JSON.parse(query), deleted: { $eq: false } }, { limit: limit, page: page, sort:[['price', sort]], lean: true })
        } else {
          result = await Product.paginate({ deleted: { $eq: false } }, { limit: limit, page: page, sort:[['price', sort]], lean: true })
        }
      } else {
        result = await Product.paginate({ deleted: { $eq: false } }, { pagination: false, lean: true })
      }
      return {
        products: result.docs,
        metadata: _.omit(result, ['docs'])
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductbyId(productID) {
    try {
      const product = await Product.findById(productID)
      return product
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createProduct(product) {
    try {
      const foundedProduct = await Product.findOne({ code: product.code })
      if (foundedProduct) {
        throw new Error('El Producto ya existe')
      } else {
        const createdProduct = await Product.create(product)
        return createdProduct
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProdcut(productID, data) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productID, data, { new: true })
      return updatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProduct(productID) {
    try {
      await Product.delete({ _id: productID })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
const productManagerDB = new ProductManagerDB()
export default productManagerDB