import dotenv from 'dotenv'
dotenv.config()

import {PERSISTENCIA} from '../constants/constants.js'

const configs = {
  port :process.env.PORT || 8080,
  mongoUri: process.env.URL_DB || null,
  cookieSecret: process.env.COOKIE_SECRET || null,
  gitHub:{
    clientId: process.env.CLIENT_ID || null,
    clientSecret: process.env.CLIENT_SECRET || null,
    appId: process.env.APP_ID || null
  },
  persistencia : process.env.PERSISTENCIA || PERSISTENCIA.MONGO,
  nodeEnv: process.env.NODE_ENV || 'development',
  gmailAppPass: process.env.PASS_GMAIL || null,
  gmailUser: process.env.USER_GMAIL || null,
  jwtSecret: process.env.JWT_SECRET || null
}

export default configs