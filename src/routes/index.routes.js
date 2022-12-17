import { Router } from 'express'

import productRouter from './products.routes'
import cartRouter from './carts.routes'

const router = Router()

router.use('/api/product', productRouter)

router.use('/api/carts',cartRouter)

export default router