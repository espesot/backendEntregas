import { PERSISTENCIA } from '../constants/constants.js'
import configs from '../configs/app.configs.js'
import { UserRepository } from './usersDAOs/users.repository.js'
import { ProductRepository } from './productsDAOs/products.repository.js'
import { CartRepository } from './cartsDAOs/carts.repository.js'
import {TicketRepository} from './ticketsDAOs/tickets.repository.js'
import logger from '../utils/logger.utils.js'

let factory = {}

switch (configs.persistencia) {
case PERSISTENCIA.MONGO:{
  logger.info('Mongo persistencia')
  await import('../configs/mongo.js')
  const { default: userMongo } = await import('./usersDAOs/users.mongo.dao.js')
  const { default: productsMongo } = await import('./productsDAOs/products.mongo.dao.js')
  const { default: cartsMongo } = await import('./cartsDAOs/carts.mongo.dao.js')
  const { default: ticketMongo } = await import('./ticketsDAOs/tickets.mongo.dao.js')
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


