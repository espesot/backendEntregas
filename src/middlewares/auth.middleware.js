import { STATUS } from '../constants/constants.js'

export const authMiddleware = (req, res, next) => {
  try {
    if (req.session.logged) {
      req.session.touch()
      next()
    } else {
      res.redirect('/login')
    }

  } catch (error) {
    res.status(403).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const checkSession = (req, res, next)=>{
  try {
    if(req.session.logged){
      req.session.touch()
      next()
    }else{
      throw new Error('usuario no logueado')
    }
  } catch (error) {
    res.status(403).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}
