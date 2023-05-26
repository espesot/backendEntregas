import { Router } from 'express'

import productRouter from './products.routes.js'
import cartRouter from './carts.routes.js'
import viewsRouter from './views.routes.js'
import usersRoutes from './users.routes.js'
import authRoutes from './auth.routes.js'

import passportLocalRoutes from './passportLocal.routes.js'
import githubRoutes from './github.routes.js'
import sessionRoutes from './sessions.routes.js'
import loggerRoutes from './logger.routes.js'
import restorePasswordRoutes from './restorePassword.routes.js'

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