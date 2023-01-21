//import productManagerFs  from '../services/products.fs.services.js'
//import cartManagerFs  from '../services/carts.fs.services.js'
import cartsManagerDB from '../services/carts.mongo.services.js'


export const postCart = async (req, res) => {
  try {
    //await cartManagerFs.createNewCart()
    const createCard = await cartsManagerDB.createCard()
    res.status(201).json({
      success:true,
      createCard: createCard,
      message:'Cart creada Ok'
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const addProductToCart = async(req,res)=>{
  try {
    let{cid,pid}= req.params
    //await productManagerFs.getProductbyId(pid)
    //await cartManagerFs.addProductToCart(cid,pid)
    await cartsManagerDB.addProductToCart(cid,pid)
    res.status(201).json({
      success:true,
      message:'Producto agregado al Cart'
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const getProductByCartId = async (req,res)=>{
  try {
    const cid = req.params.cid
    const prodcuts = await cartsManagerDB.getProductByCartId(cid)

    res.status(201).json({
      success:true,
      products:prodcuts
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}