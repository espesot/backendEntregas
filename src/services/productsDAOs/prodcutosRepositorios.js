import ProductDTO from './productosDTO.js'

export class ProductRepository{
  constructor(dao){
    this.dao = dao
  }

  async getProducts(params){
    try {
      const response = this.dao.getProducts(params)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductbyId(productId){
    try {
      const product = await this.dao.getProductbyId(productId)
      const productDTO = new ProductDTO(product)
      return productDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createProduct(product){
    try {
      const createdProduct = await this.dao.createProduct(product)
      const productDTO = new ProductDTO(createdProduct)
      return productDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(productId,data){
    try {
      const updatedProduct = await this.dao.updateProduct(productId,data)
      const productDTO = new ProductDTO(updatedProduct)
      return productDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async deleteProduct(productId, user){
    try {
      await this.dao.deleteProduct(productId, user)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}