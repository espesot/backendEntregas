import {Router} from 'express'
import * as usersControllers from '../controllers/users.controller.js'

const router = Router()

router.post('/', usersControllers.createUser)
router.get('/', usersControllers.getUser)

router.post('/ui', usersControllers.createUser)

router.put('/updateUser/:email', usersControllers.updateUser)
router.put('/updatePassword/:email', usersControllers.updatePassword)

router.post('/premium/:uid', usersControllers.updateUserRole)
export default router