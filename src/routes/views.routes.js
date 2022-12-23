import { Router } from 'express'

import * as views from '../controllers/views.controllers.js'

const router = Router()

router.get('/', views.getHome)
router.get('/realtimeproducts', views.getRealTimeProducts)

export default router