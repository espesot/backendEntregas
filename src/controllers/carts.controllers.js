import productManager  from '../services/products.services.js'
import cartManager  from '../services/carts.services.js'


export const postCart = async (req, res) => {
  try {
    await cartManager.createNewCart()
    res.status(201).json({
      success:true,
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
    cid = Number(cid)
    pid = Number(pid)
    await productManager.getProductbyId(pid)
    await cartManager.addProductToCart(cid,pid)

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
    const cid = Number(req.params.cid)
    const cart= await cartManager.getCartById(cid)
    
    let product = {}
    const products = []

    for await(const el of cart.products){
      product = await productManager.getProductbyId(el.product)
      products.push(product)
    }
    res.status(201).json({
      success:true,
      cartId:cid,
      products:products
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}