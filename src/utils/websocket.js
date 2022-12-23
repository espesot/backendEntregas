export const webSocketInit = (io) => {
  io.on('connection', () => {
    console.log('Usuario Conectado')

    io.on('disconnect',()=>{
      console.log('Usuario Desconectado')
    })
  })
}