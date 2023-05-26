import logger from '../utils/loggerUtilis.js'

export default function loggerMiddleware(req,res,next){
  logger.info(`${new Date().toLocaleDateString()} Method: ${req.method} URL: ${req.url}`)
  next()
}