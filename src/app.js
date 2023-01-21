import express from 'express'
import { Server } from 'socket.io'
import routes from './routes/index.routes.js'
import {engine} from 'express-handlebars'
import { webSocketInit } from './utils/websocket.js'
import dotenv from 'dotenv'
import dbConnect from './configs/db.config.js'

dotenv.config()   // agregado archivo para tomar variables de congig 
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public/'))


app.engine('handlebars', engine())
app.set('view engine','handlebars')
app.set('view','src/views')

app.use((req,res,next)=>{
  req.io = io
  next() 
})

//conexion MongoDB
dbConnect()

app.use(routes)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`))
server.on('error', (err) => console.log(err))

server.on('error',(err)=> console.log(err))

const io = new Server(server)
webSocketInit(io)