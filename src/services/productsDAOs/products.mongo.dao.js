
import _ from 'lodash'
import * as emailUtils from '../../utils/nodemailer.utils.js'
import productModel from '../../models/Product.model.js'

class ProductMongo {
  constructor(productModel) {
    this.product = productModel
  }

  async getProducts(params) {
    try {
      let result = []
      if (!_.isEmpty(params)) {
        const { limit, page, sort, query } = params
        if (query) {
          result = await this.product.paginate({...JSON.parse(query), deleted: { $eq: false } }, { limit: limit, page: page, sort:[['price', sort]], lean: true })
        } else {
          result = await this.product.paginate({ deleted: { $eq: false } }, { limit: limit, page: page, sort:[['price', sort]], lean: true })
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

  async getProductbyId(productID) {
    try {
      const product = await this.product.findById(productID).lean()
      if(product){
        return product
      }else{
        throw new Error('El producto no existe')
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
        const createdProduct = await this.product.findByIdAndUpdate(foundedProduct._id,foundedProduct,{new:true})
        return createdProduct
      } else {
        const createdProduct = await this.product.create(product)
        return createdProduct
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProdcut(productID, data) {
    try {
      const updatedProduct = await this.product.findByIdAndUpdate(productID, data, { new: true })
      return updatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProduct(productID,user) {
    try {

      const foundedProduct = await this.product.findById(productID).lean()
      if(foundedProduct){
        if(user.role === 'admin'){
          await this.product.delete({_id: productID})
          return
        }
        if(foundedProduct.owner === undefined){
          throw new Error('Solo un usuario Premium puede borrar este producto')
        }
        if(user.role === 'premium' && foundedProduct.owner._id == user.id){
          await this.product.delete({_id:productID})
          emailUtils.sendProductDeletedEmail(user.email)
          return
        }else{
          throw new Error('Solo un usuario Premium puede borrar este producto')
        }
      }else{
        throw new Error('El producto no existe')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
export default new ProductMongo(productModel)