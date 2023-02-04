import { Router } from 'express'

import productRouter from './products.routes.js'
import cartRouter from './carts.routes.js'
import viewsRouter from './views.routes.js'
import usersRoutes from './users.routes.js'
import authRoutes from './auth.routes.js'

const router = Router()

router.use('/',viewsRouter)

router.use('/api/products', productRouter)

router.use('/api/carts',cartRouter)

router.use('api/auth' ,authRoutes)

router.use('api/users', usersRoutes)

export default router