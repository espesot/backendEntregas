import { Router } from 'express'
import {authMiddleware,isUser} from '../middlewares/auth.middleware.js'
import * as views from '../controllers/views.controllers.js'

const router = Router()


router.get('/', authMiddleware, views.getHome)
router.get('/login', views.login)
router.get('/register', views.register)
router.get('/products', authMiddleware, views.getProducts)
router.get('/cart/:cid', authMiddleware, views.getCart)
router.get('/realtimeproducts', authMiddleware, views.getRealTimeProducts)
router.get('/chat', [authMiddleware,isUser],views.getChat)
export default router