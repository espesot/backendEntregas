import { Router } from 'express'

import productRouter from './products.routes.js'
import cartRouter from './carts.routes.js'
import viewsRouter from './views.routes.js'

const router = Router()

router.use('/',viewsRouter)

router.use('/api/products', productRouter)

router.use('/api/carts',cartRouter)

export default router