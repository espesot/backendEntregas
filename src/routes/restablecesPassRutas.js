import { Router } from 'express'
import * as restorePassword from '../controllers/restPassword.js'

const router = Router()

router.get('/', restorePassword.view)
router.post('/', restorePassword.sendEmail)
router.put('/', restorePassword.restore)


export default router