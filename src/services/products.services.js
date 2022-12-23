import fs from 'fs'

export class ProductManager {
  constructor(path) {
    this.products = []
    this.path = path
  }

  async addProducts(newProduct) {
    try{
      this.#validate(newProduct)

      await this.#readProducts()

      if(this.products.find((product)=> product.code === newProduct.code)){
        throw new Error('El producto ya existe')
      }

      const product ={
        id: this.#getMaxId +1,
        title: newProduct.title,
        description: newProduct.description,
        code: newProduct.code,
        price: newProduct.price,
        status:newProduct.status,
        stock: newProduct.stock,
        category: newProduct.category,
        thumbnails: newProduct.thumbnails
      }
      this.products.push(product)

      await fs.promises.writeFile(this.path, JSON.stringify(this.products),'utf-8')


    }catch(error){
      throw new Error(error.message)
    }

  }


  async getProducts(){
    try{
      await this.#readProducts()
      return this.products
    }catch{
      throw new Error('Error al leer el archivo de productos')
    }
  }

  async getProductbyId(productID){
    try{
      await this.#readProducts()
      const fundedProduct = this.products.find((product)=> product.id === productID)
      if(fundedProduct){
        return fundedProduct
      }else{
        throw new Error('Producto no encotrado ')
      }
    }catch(error){
      throw new Error(error.message)
    }
  }

  async updateProduct(productID,updatedProduct){
    try{
      this.#readProducts()
      const foundedIndex = this.products.findIndex((product)=> product.id === productID)
      if(foundedIndex !== -1){
        this.products[foundedIndex] = {id:productID, ...updatedProduct}
        await fs.promises.writeFile(this.path, JSON.stringify(this.products),'utf-8')
      }else{
        throw new Error('Producto no encotrado')
      }
    }catch(error){
      throw new Error(error.message)
    }
  } 

  async deleteProduct(productID){
    try{
      this.#readProducts()
      this.products = this.products.filter((product)=> product.id !== productID)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products),'utf-8')
    }catch(error){
      throw new Error('Error al eliminar el producto')
    }
  }



  #validate(newProduct){
    const{title,description,code,price,status,stock,category,thumbnails} = newProduct
    
    if(!title || !isNaN(title)){
      throw new Error('Campo incorrecto o Vacio!!')
    }
    if(!description || !isNaN(description)){
      throw new Error('Campo incorrecto o Vacio!!')
    }
    if(!code || !isNaN(code)){
      throw new Error('Campo incorrecto o Vacio!!')
    }
    if(!price || !isNaN(price)){
      throw new Error('Campo incorrecto o Vacio!!')
    }
    if(!status || !isNaN(status)){
      throw new Error('Campo incorrecto o Vacio!!')
    }
    if(!stock || !isNaN(stock)){
      throw new Error('Campo incorrecto o Vacio!!')
    }
    if(!category || !isNaN(category)){
      throw new Error('Campo incorrecto o Vacio!!')
    }
    if(!thumbnails || !isNaN(thumbnails)){
      throw new Error('Campo incorrecto o Vacio!!')
    }
  }

  async #readProducts(){
    try{
      if(fs.existsSync(this.path)){
        const products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
        this.products = products
      } else{
        this.products = []
      }
    }catch(error){
      throw new Error('Error al leer los productos!!!')
    }
  }

  #getMaxId() {
    let maxId = 0
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id
    })
    return maxId
  }
}

const productManager = new ProductManager('./src/store/products.json')
export default productManager