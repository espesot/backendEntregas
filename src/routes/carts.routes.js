import { Router } from 'express'
import * as cart from '../controllers/carts.controllers.js'

const router = Router()

router.post('/', cart.postCart)
router.post('/:cid/product/:pid', cart.addProductToCart)
router.get('/:cid', cart.getProductByCartId)

export default router