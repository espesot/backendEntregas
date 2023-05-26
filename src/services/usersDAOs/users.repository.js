import UserDTO from './usuariosDTO.js'
import FilterUserDTO from './filtradoUsuarios.js'

export class UserRepository{
  constructor(dao){
    this.dao = dao
  }

  async getUser(email){
    try {
      const user = await this.dao.getUser(email)
      const userDTO = new UserDTO(user)
      return userDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createUser(data){
    try {
      const createdUser = await this.dao.createUser(data)
      const userDTO = new UserDTO(createdUser)
      return userDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateUser(email, data, updatePassword=false){
    try {
      const updatedUser = await this.dao.updateUser(email, data,updatePassword)
      const userDTO = new UserDTO(updatedUser)
      return userDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUserById(id){
    try {
      const user = await this.dao.getUserById(id)
      const userDTO = new UserDTO(user)
      return userDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async getUsers(filter){
    try {
      const users = await this.dao.getUsers()
      const usersDTO = []
      if(filter){
        users.forEach((user)=>{
          usersDTO.push(new FilterUserDTO(user))  
        })
      }else{
        users.forEach((user)=>{
          usersDTO.push(new UserDTO(user))
        })
        
      }
      return usersDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUserByCartId(cartId){
    try {
      const user = await this.dao.getUserByCartId(cartId)
      const userDTO = new UserDTO(user)
      return userDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteUser(userId){
    try {
      await this.dao.deleteUser(userId)
      return
    } catch (error) {
      throw new Error(error.message)
    }
  }
}