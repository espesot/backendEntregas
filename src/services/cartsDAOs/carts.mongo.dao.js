import CartsCRUD from '../carts.crud.js'
import cartModel from '../../models/Cart.model.js'

class CartMongo extends CartsCRUD{
  constructor(cart){
    super(cart)
  }
}

export default new CartMongo(cartModel)