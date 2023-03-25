export default class SessionDTO{
  constructor(data){
    this.logged = data.logged
    this.user = {
      id: data.user._id ||data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      age: data.user.age,
      cartId: data.user.cartId,
      role: data.user.role
    }
  }
}