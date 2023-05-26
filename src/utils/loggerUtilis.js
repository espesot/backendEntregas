import winston from 'winston'
import {createLogger, transports, format} from 'winston'

import config from '../configs/app.js'

const customLevels = {
  levels:{
    fatal:0,
    error:1,
    warning:2,
    info:3,
    http:4,
    debug:5
  },
  colors:{
    fatal:'black',
    error:'red',
    warning:'green',
    info:'blue',
    http:'magenta',
    debug:'cyan'
  }
}

const logger = createLogger({
  levels:customLevels.levels
})

winston.addColors(customLevels.colors)

const file = new transports.File({
  filename:'./errors.log',
  level:'error',
  format:format.combine(
    format.label({label:'error'}),
    format.timestamp(),
    format.prettyPrint()
  )
})

logger.add(file)

const dev = new transports.Console({
  level:'debug',
  format:format.combine(format.colorize(),format.simple())
})

const prod = new transports.Console({
  level:'info',
  format:format.combine(format.colorize(),format.simple())
})

if(config.nodeEnv === 'development'){
  logger.add(dev)
}else{
  logger.add(prod)
}

export default logger