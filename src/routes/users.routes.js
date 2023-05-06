import {Router} from 'express'
import * as usersControllers from '../controllers/users.controller.js'
import {uploader} from '../utils/uploader.utils.js'
//import {isLogged} from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', usersControllers.createUser)
router.post('/:uid/documents',
  [
    uploader.fields([
      {name: 'profile'},
      {name: 'product'},
      {name: 'document'}
    ])

  ],usersControllers.uploadFiles)
router.post('/ui',usersControllers.createUser)
router.get('/', usersControllers.getUser)

router.post('/ui', usersControllers.createUser)

router.put('/updateUser/:email', usersControllers.updateUser)
router.put('/updatePassword/:email', usersControllers.updatePassword)

router.post('/premium/:uid', usersControllers.updateUserRole)
export default router