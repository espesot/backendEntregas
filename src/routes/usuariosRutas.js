import {Router} from 'express'
import * as usersControllers from '../controllers/usuariosControlador.js'
import {uploader} from '../utils/uploader.js'
import {isLogged} from '../middlewares/autorizacionMiddleware.js'

const router = Router()

router.post('/', usersControllers.createUser)

router.post('/:uid/documents',
  [
    isLogged,
    uploader.fields([
      {name: 'profile'},
      {name: 'product'},
      {name: 'document'}
    ])

  ],usersControllers.uploadFiles)

router.get('/', usersControllers.getUsers)

router.put('/updateUser/:email', usersControllers.updateUser)

router.put('/updatePassword/:email', usersControllers.updatePassword)

router.post('/premium/:uid', usersControllers.updateUserRole)

router.delete('/:email',usersControllers.deleteUser)

router.delete('/',usersControllers.deleteInactiveUsers)

router.get('/:email', usersControllers.getUser)

export default router