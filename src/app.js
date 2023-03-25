import express from 'express'
import {engine} from 'express-handlebars'
import cookie from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import passport from './utils/passport.utils.js'
import configs from './configs/app.configs.js'
import { Server } from 'socket.io'
import { webSocketInit } from './utils/websocket.js'
import routes from './routes/index.routes.js'

// import dotenv from 'dotenv'
// dotenv.config()
// import dbConnect from './configs/db.config.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req,res,next)=>{
  req.io = io
  next()
})



//Nuevo
app.use(cookie())
app.use(session({
  store: new mongoStore({
    mongoUrl: configs.mongoUri,
    options:{
      userNewUrlparser: true,
      useUnifiedTopology: true,
    }
  }),
  secret: configs.cookieSecret,
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

app.use(routes)


const server = app.listen(configs.port, () => {
  console.log(`🚀 Server started on port http://localhost:${configs.port}`)
})

server.on('error', (err) => console.log(err))

const io = new Server(server)
webSocketInit(io)

// webSocketInit(io)

export default app