
import { User } from '../../models/User.model.js'
import bcrypt from 'bcrypt'
import cartModel from '../../models/Cart.model.js'

class UserMongo{
  constructor(userModel, cartModel){
    this.user = userModel
    this.cart = cartModel
  }
  async getUsers(){
    try {
      const users = await this.user.find({deleted:{$eq:false}})
      if(users.lenght === 0){
        throw new Error('usuario vacio')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async getUser(email){
    try {
      const user = await this.user.findOne({email:email}).lean()
      if(!user){
        throw new Error('error en la busqueda')
      }
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async getUserById(id){
    try {
      const user = await this.user.findById(id).lean()
      if(!user){
        throw new Error('error en la busqueda')
      }
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async getUserByCartId(cartId){
    try {
      const user = await this.user.findOne(cartId).lean()
      return user
    } catch (error) {
      throw new Error('error en la busqueda')
    }
  }
  async createUser(data){
    try {
      const foundedUser = await this.user.findOne({email:data.email}).lean()
      if(foundedUser){
        throw new Error('el usuario ya existe')
      }else{
        const createdCart = await this.cart.create({})
        const newUser = {...data, cartId: createdCart._id}
        newUser.password = bcrypt.hashSync(newUser.password,bcrypt.genSaltSync(10))
        const createdUser = await this.user.create(newUser)
        return createdUser
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateUser(email, data, updatePassword = false){
    try {
      const user = await this.getUser(email)
      if(user){
        if(data.password){
          if(updatePassword){
            data.password = bcrypt.hashSync(data.password,bcrypt.genSaltSync(10))
          }
        }else{
          delete data.password
        }
      }
      const updatedUser = await this.user.findOneAndUpdate({email},{...data},{new:true}).lean()
      return updatedUser
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async deleteUser(userId){
    try {
      await this.user.delete({_id:userId})
      return
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
export default new UserMongo(User,cartModel)
