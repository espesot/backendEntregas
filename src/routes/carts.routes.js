import { Router } from 'express'
import * as cart from '../controllers/carts.controllers.js'

const router = Router()

router.post('/', cart.postCart)
router.get('/:cid', cart.getProductsByCartId)
router.put('/:cid/product/:pid', cart.addProductToCart)
router.put('/:cid', cart.addProductsToCart)
router.delete('/:cid/product/:pid', cart.deleteProductToCart)
router.get('/:cid', cart.getProductsByCartId)
router.post('/:cid/purchase', cart.purchase)

export default router