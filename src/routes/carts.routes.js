import { Router } from 'express'
import * as cart from '../controllers/carts.controllers.js'
import {isLogged,isUser} from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', cart.postCart)
router.get('/:cid', cart.getProductsByCartId)
router.put('/:cid/product/:pid',[isLogged,isUser], cart.addProductToCart)
router.put('/:cid', [isLogged,isUser], cart.addProductsToCart)
router.delete('/:cid/product/:pid', cart.deleteProductToCart)
router.get('/:cid', cart.getProductsByCartId)
router.post('/:cid/purchase', cart.purchase)

export default router