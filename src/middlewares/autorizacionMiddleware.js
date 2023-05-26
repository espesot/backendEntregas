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

export const isLogged = (req, res, next)=>{
  try {
    if(req.session.logged){
      req.session.touch()
      next()
    }else{
      throw new Error('Usuario no logueado')
    }
  } catch (error) {
    res.status(403).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}

export const isUser =(req,res,next) =>{
  try {
    if(req.session.user.role ==='user'){
      req.session.touch()
      next()
    }else{
      throw new Error('el usuario no tiene rol de usuario')
    }
  } catch (error) {
    res.status(403).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}


export const isAdmin =(req,res,next) =>{
  try {
    if(req.session.user.role ==='admin'){
      req.session.touch()
      next()
    }else{
      throw new Error('no es una ADMIN')
    }
  } catch (error) {
    res.status(403).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}

export const isUserOrPremium = (req,res,next)=>{
  try {
    if(req.session.user.role === 'user' || req.session.user.role === 'premium'){
      req.session.touch()
      next()
    }else{
      throw new Error('Debe ser premium o usuario para agregar productos')
    }
  } catch (error) {
    res.status(403).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}

export const isAdminOrPremium = (req,res,next)=>{
  try {
    if(req.session.user.role === 'admin' || req.session.user.role === 'premium'){
      req.session.touch()
      next()
    }else{
      throw new Error('Debe ser premium o admin para agregar productos')
    }
  } catch (error) {
    res.status(403).json({
      success:STATUS.FAIL,
      message:error.message
    })
  }
}


// export const checkSession = (req, res, next)=>{
//   try {
//     if(req.session.logged){
//       req.session.touch()
//       next()
//     }else{
//       throw new Error('usuario no logueado')
//     }
//   } catch (error) {
//     res.status(403).json({
//       success: STATUS.FAIL,
//       message: error.message
//     })
//   }
// }
