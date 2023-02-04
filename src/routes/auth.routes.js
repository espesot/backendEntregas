import { Router } from 'express'
import * as authControllers from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', authControllers.login)

router.get('/logout', authControllers.logout)

export default router