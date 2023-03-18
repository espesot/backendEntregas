import express from 'express'
import {engine} from 'express-handlebars'
import cookie from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import passport from './utils/passport.utils.js'
import dotenv from 'dotenv'
dotenv.config()
// import dbConnect from './configs/db.config.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Nuevo
app.use(cookie())
app.use(session({
  store: new mongoStore({
    mongoUrl: process.env.URL_DB,
    options:{
      userNewUrlparser: true,
      useUnifiedTopology: true,
    }
  }),
  secret: process.env.COOKIE_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge:100000}
}))

app.use(express.static('public/'))

app.engine('handlebars', engine())
app.set('view engine','handlebars')
app.set('views','src/views')


app.use(passport.initialize())
app.use(passport.session())

// app.use(routes)



// webSocketInit(io)

export default app