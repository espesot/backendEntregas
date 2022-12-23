import productManager from '../services/products.services.js'

export const getHome = async (req, res) => {
  try {
    const productsList = await productManager.getProducts()
    res.render('index',{
      products: productsList
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const getRealTimeProducts = async(req,res)=>{
  try {
    const productsList = await productManager.getProducts()
    res.render('realTimeProducts',{
      products: productsList
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}