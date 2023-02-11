import {Router} from 'express'
import * as usersControllers from '../controllers/users.controller.js'

const router = Router()

router.post('/', usersControllers.createUser)
router.get('/', usersControllers.getUser)

router.put('/updateUser/:email', usersControllers.updateUser)
router.put('/updatePassword/:email', usersControllers.updatePassword)
export default router