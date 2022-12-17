import { Router } from 'express'
import * as product from '../controllers/products.controllers.js'

const router = Router()

router.get('/', product.getPrducts)
router.get('/:pid', product.getProductbyId)

router.post('/',product.postProduct)

router.put('/:pid',product.updateProduct)

router.delete('/:pid', product.deleteProductById)

export default router
