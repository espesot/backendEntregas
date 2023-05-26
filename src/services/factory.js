import { PERSISTENCIA } from '../constants/constants.js'
import configs from '../configs/app.js'
import { UserRepository } from './usersDAOs/users.repository.js'
import { ProductRepository } from './productsDAOs/prodcutosRepositorios.js'
import { CartRepository } from './cartsDAOs/carrosRepositorio.js'
import {TicketRepository} from './ticketsDAOs/ticketsRepositorios.js'
import logger from '../utils/loggerUtilis.js'

let factory = {}

switch (configs.persistencia) {
case PERSISTENCIA.MONGO:{
  logger.info('Mongo persistencia')
  await import('../configs/mongo.js')
  const { default: userMongo } = await import('./usersDAOs/usuariosMongoDAO.js')
  const { default: productsMongo } = await import('./productsDAOs/productosMongoDAO.js')
  const { default: cartsMongo } = await import('./cartsDAOs/carrosMongo.js')
  const { default: ticketMongo } = await import('./ticketsDAOs/ticketsMongoDAO.js')
  factory = {
    users: new UserRepository(userMongo),
    products: new ProductRepository(productsMongo),
    carts: new CartRepository(cartsMongo),
    tickets: new TicketRepository(ticketMongo)
  }
  break}
case PERSISTENCIA.FILE:{
  logger.info('FILE persistencia')
  const { default: userFile } = await import('./usersDAOs/users.file.dao.js')
  const { default: productsFile } = await import('./productsDAOs/products.file.dao.js')
  const { default: cartsFile } = await import('./cartsDAOs/carts.file.dao.js')
  const { default: ticketFile } = await import('./ticketsDAOs/tickets.file.dao.js')
  factory = {
    users: new UserRepository(userFile),
    products: new ProductRepository(productsFile),
    carts: new CartRepository(cartsFile),
    tickets: new TicketRepository(ticketFile)
  }
  break}
case PERSISTENCIA.MYSQL:
  console.log('MySql persistencia')
  break
case PERSISTENCIA.MEMORY:
  console.log('Memory persistencia')
  break
}
export default factory


