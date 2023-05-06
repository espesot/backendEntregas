import * as authServices from '../services/auth.services.js'
import { STATUS } from '../constants/constants.js'
import factory from '../services/factory.js'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const logged = await authServices.login(email, password)

    if (logged) {
      req.session.logged = true
      req.session.user = await factory.user.getUser(email)
      res.status(200).json({
        success: STATUS.SUCCESS,
        message: 'ususario Loggeado OK'
      })
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