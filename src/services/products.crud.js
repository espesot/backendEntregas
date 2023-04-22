import _ from 'lodash'

export default class ProductCRUD {
  constructor(productModel) {
    this.product = productModel
  }
  async getProducts(params) {
    try {
      let result = []
      if (!_.isEmpty(params)) {
        const { limit, page, sort, query } = params
        if (query) {
          result = await this.product.paginate(
            { ...JSON.parse(query), deleted: { $eq: false } },
            { limit: limit, page: page, sort: [['price', sort]], lean: true }
          )
        } else {
          result = await this.product.paginate(
            { deleted: { $eq: false } },
            { limit: limit, page: page, sort: [['price', sort]], lean: true }
          )
        }
      } else {
        result = await this.product.paginate(
          { deleted: { $eq: false } },
          { pagination: false, lean: true }
        )
      }
      return {
        products: result.docs,
        metadata: _.omit(result, ['docs']),
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductById(productId) {
    try {
      const product = await this.product.findById(productId)
      if (product) {
        return product
      } else {
        throw new Error('el producto no existe')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createProduct(product) {
    try {
      const foundedProduct = await this.product.findOne({ code: product.code })
      if (foundedProduct?.deleted) {
        foundedProduct.deleted = false
        const createProduct = await this.product.findByIdAndUpdate(
          foundedProduct._id,
          foundedProduct,
          { new: true }
        )
        return createProduct
      } else {
        const createdProduct = await this.product.create(product)
        return createdProduct
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(productId, data) {
    try {
      const updatedProduct = await this.product.findByIdAndUpdate(
        productId,
        data,
        { new: true }
      )
      return updatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProduct(producId, user) {
    try {
      const foundedProduct = await this.product.findById(producId).lean()
      if (foundedProduct) {
        if (user.role === 'admin') {
          await this.product.delete({ _id: producId })
          return
        }
        if (foundedProduct.owner === undefined) {
          throw new Error('solo el user Premium puede eliminar produtos')
        }
        if (user.role === 'premium' && foundedProduct.owner._id == user._id) {
          await this.product.delete({ _id: producId })
          return
        } else {
          throw new Error('solo el user Premium puede eliminar produtos')
        }
      } else {
        throw new Error('solo el user Premium puede eliminar produtos')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}