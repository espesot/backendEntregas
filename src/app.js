import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import {engine} from 'express-handlebars'
import { Server } from 'socket.io'
import { webSocketInit } from './utils/websocket.js'
import routes from './routes/index.routes.js'
import dbConnect from './configs/db.config.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public/'))


app.engine('handlebars', engine())
app.set('view engine','handlebars')
app.set('views','src/views')

app.use((req,res,next)=>{
  req.io = io
  next() 
})

//conexion MongoDB
dbConnect()

app.use(routes)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`))
server.on('error', (err) => console.log(err))

server.on('error',(err)=> console.log(err))

const io = new Server(server)
webSocketInit(io)