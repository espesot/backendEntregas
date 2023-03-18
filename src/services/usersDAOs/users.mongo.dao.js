import UsersCRUD from '../users.crud.js'
import {User} from '../../models/User.model.js'
import cartModel from '../../models/Cart.model.js'

class UserMongo extends UsersCRUD{
  constructor(user, cart){
    super(user,cart)
  }
}

export default new UserMongo(User, cartModel)