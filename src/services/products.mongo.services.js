import Product from '../models/Product.model.js'

class ProductManagerDB {
  constructor() { }
  async getProducts(){
    try {
      const products = await Product.find({deleted:{$eq:false}}).lean()
      return products
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductbyId(productID){
    try {
      console.log(productID)
      const product = await Product.findById(productID)
      return product
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createProduct(product){
    try {
      const foundedProduct = await Product.findOne({code: product.code})
      if(foundedProduct){
        throw new Error('El Producto ya existe')
      }else{
        const createdProduct = await Product.create(product)
        return createdProduct
      }
      
    } catch (error) {
      throw new Error(error.message)
    }    
  }

  async updateProdcut(productID,data){
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productID,data,{new:true})
      return updatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProduct(productID){
    try {
      await Product.delete({_id: productID})
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
const productManagerDB = new ProductManagerDB()
export default productManagerDB