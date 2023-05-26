export default class CartDTO{
  constructor(cart){
    this.id = cart._id || cart.id
    this.items = cart.items
    this.deleted = cart.deleted
    this.createdAt = cart.createdAt
    this.updatedAt = cart.updatedAt
  }
}