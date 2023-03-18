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
          result = await this.product.paginate({ ...JSON.parse(query), deleted: { $eq: false } }, { limit: limit, page: page, sort: [['price', sort]], lean: true })
        } else {
          result = await this.product.paginate({ deleted: { $eq: false } }, { limit: limit, page: page, sort: [['price', sort]], lean: true })
        }
      } else {
        result = await this.product.paginate({ deleted: { $eq: false } }, { pagination: false, lean: true })
      }
      return {
        products: result.docs,
        metadata: _.omit(result, ['docs'])
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
  async createProduct(product){
    try {
      const foundedProduct = await this.product.findOne({code:product.code})
      if(foundedProduct){
        throw new Error('el codigo ya existe')
      }else{
        const createdProduct = await this.product.create(product)
        return createdProduct
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(productId,data){
    try {
      const updatedProduct = await this.product.findByIdAndUpdate(productId,data,{new:true})
      return updatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }


  async deleteProduct(producId){
    try {
      await this.product.delete({_id:producId})
    } catch (error) {
      throw new Error(error.message)
    }
  }
}