import { Router } from 'express'
import {STATUS} from '../constants/constants.js'
import logger from '../utils/loggerUtilis.js'

const router = Router()

router.get('/',(req,res)=>{
  logger.fatal('FATAL logger')
  logger.error('ERROR logger')
  logger.warning('WARN logger')
  logger.info('INFO logger')
  logger.http('HTTP logger')
  logger.debug('debug logger')

  res.status(200).json({
    status: STATUS.SUCCESS
  })
})

export default router