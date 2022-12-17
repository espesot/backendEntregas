import express from 'express'
import routes from './routes/index.routes'



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)


const PORT =  8080
const server = app.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`))
server.on('error', (err) => console.log(err))