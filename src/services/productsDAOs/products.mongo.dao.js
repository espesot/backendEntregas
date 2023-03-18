import ProductsCRUD from '../products.crud.js'
import productModel from '../../models/Product.model.js'

class ProductMongo extends ProductsCRUD{
  constructor(product){
    super(product)
  }
}

export default new ProductMongo(productModel)