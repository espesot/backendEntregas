import configs from './configs/app.configs.js'
import app from './app.js'


import { Server } from 'socket.io'
import { webSocketInit } from './utils/websocket.js'
import routes from './routes/index.routes.js'



app.use((req,res,next)=>{
  req.io = io
  next() 
})
app.use(routes)

const server = app.listen(configs.port, () => {
  console.log(`🚀 Server started on port http://localhost:${configs.port}`)
})

server.on('error', (err) => console.log(err))

const io = new Server(server)
webSocketInit(io)