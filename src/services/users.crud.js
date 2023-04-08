import bcrypt from 'bcrypt'

export default class UsersCRUD{
  constructor(userModel,cartModel){
    this.user = userModel
    this.cart = cartModel
  }

  async getUser(email){
    try {
      const user = await this.user.findOne({email:email}).lean()
      return user
    } catch (error) {
      throw new Error('Error al buscar usuario') 
    }
  }

  async getUserByCartID(cartId){
    try {
      const user = await this.user.findOne({cartId:cartId}).lean()
      return user
    } catch (error) {
      throw new Error('Error al buscar usuario') 
      
    }
  }


  async createUser(data){
    try {
      const foundedUser = await this.getUser(data.email)
      if(foundedUser){
        throw new Error('Error el usuario ya existe') 
      }else{
        const createdCart = await this.cart.create({})
        const newUser = {...data,cartId:createdCart._id}
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10))
        const createdUser = await this.user.create(newUser)
        return createdUser        
      }
    } catch (error) {
      throw new Error(error.message) 
    }
  }

  async updateUser(email, data, updatePassword=false){
    try {
      const user = await this.getUser(email)
      if(user){
        if(data.password){
          if(updatePassword){
            data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
          }else{
            delete data.password
          }
        }
        const updatedUser = await this.user.findOneAndUpdate({email},{...data},{new:true}).lean()
        return updatedUser
      }  
    } catch (error) {
      throw new Error(error.message) 
    }
  }

  async getUserById(id){
    try {
      const user = await this.user.findById(id).lean()
      if(!user){
        throw new Error('Error en busqueda de usuario')
      }
      return user
    } catch (error) {
      throw new Error(error.message) 
    }
  }

}