import * as authServices from '../services/auth.services.js'
import * as usersServices from '../services/users.services.js'
import { STATUS } from '../constants/constants.js'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const logged = await authServices.login(email, password)

    if (logged) {
      req.session.logged = true
      req.session.user = await usersServices.getUser(email)
      res.redirect('/')
    } else {
      res.status(401).json({
        success: STATUS.FAIL,
        message: 'Combinacion erronea de User & Password'
      })
    }
  } catch (error) {
    res.status(500).json({
      success:STATUS.FAIL,
      message: error.message
    })
  }
}

export const logout = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.json(error)
      } else {
        res.redirect('/login')
      }
    })
  } catch (error) {
    res.status(500).json({
      success:STATUS.FAIL,
      message: error.message
    })
  }
}