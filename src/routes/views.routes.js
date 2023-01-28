import { Router } from 'express'

import * as views from '../controllers/views.controllers.js'

const router = Router()

router.get('/', views.getHome)

router.get('/products', views.getProducts)

router.get('/chat', views.getChat)

router.get('/realtimeproducts', views.getRealTimeProducts)

router.get('/cart/:cid', views.getCart)

export default router