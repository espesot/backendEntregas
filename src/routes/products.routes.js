import { Router } from 'express'
import * as products from '../controllers/products.controllers.js'
import{isLogged, isUser} from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', products.getProducts)

router.get('/mockingproducts', products.mockProduct)

router.get('/:pid', products.getProductbyId)

router.post('/',[isLogged,isUser],products.postProduct)

router.put('/:pid',[isLogged,isUser],products.updateProduct)

router.delete('/:pid',[isLogged,isUser] ,products.deleteProductById)

export default router
