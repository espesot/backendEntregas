export default class UserDTO{
  constructor(user){
    this.id = user._id || user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.age = user.age
    this.password = user.password
    this.cartId = user.cartId
    this.role = user.role
    this.documents = user.documents
    this.lastConnection = user.lastConnection
    this.status = user.status
    this.deleted = user.deleted
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}