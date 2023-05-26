import { Router } from 'express'

import productRouter from './productosRutas.js'
import cartRouter from './carroRutas.js'
import viewsRouter from './vistasRutas.js'
import usersRoutes from './usuariosRutas.js'
import authRoutes from './autorizacionRutas.js'

import passportLocalRoutes from './passportRutas.js'
import githubRoutes from './github.js'
import sessionRoutes from './sessiones.js'
import loggerRoutes from './loggerRutas.js'
import restorePasswordRoutes from './restablecesPassRutas.js'

const router = Router()

router.use('/',viewsRouter)

router.use('/api/products', productRouter)

router.use('/api/carts',cartRouter)

router.use('/api/auth' ,authRoutes)

router.use('/api/users', usersRoutes)

router.use('/api/passportLocal', passportLocalRoutes)

router.use('/api/github', githubRoutes)

router.use('/api/sessions', sessionRoutes)

router.use('/api/loggerTest', loggerRoutes)

router.use('/api/restorePassword', restorePasswordRoutes)
export default router