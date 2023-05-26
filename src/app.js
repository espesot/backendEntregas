import express from 'express'
import {engine} from 'express-handlebars'
import cookie from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import passport from './utils/passportUtilis.js'
import configs from './configs/app.js'
import { Server } from 'socket.io'
import { webSocketInit } from './utils/websocket.js'
import routes from './routes/indexRutas.js'
import swaggerUiExpress from 'swagger-ui-express'
import specs from './utils/swagger.js'

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

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

const server = app.listen(configs.port, () => {
  console.log(`🚀 Server started on port http://localhost:${configs.port}`)
})

server.on('error', (err) => console.log(err))

const io = new Server(server)
webSocketInit(io)

export default app