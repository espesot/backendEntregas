import Message from '../models/mensajes.js'

export const webSocketInit = (io) => {
  io.on('connection', (socket) => {
    console.log('Usuario Conectado')

    Message.find({},(err,result)=>{
      if(err){
        console.log(err)
      }else{
        socket.emit('wellcome', result)
      }
    })

    socket.on('newUser',(data)=>{
      socket.broadcast.emit('newUser',data)
    })

    socket.on('message',async(data)=>{
      try {
        await Message.create(data)
        const messages = await Message.find({})
        io.emit('message', messages)
      } catch (error) {
        console.log(error.message)
      }
    })

    socket.on('disconnect',()=>{
      console.log('Usuario Desconectado')
    })
  })
}