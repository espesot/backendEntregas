import fs from 'fs'

export class ProductManager {
  constructor(path) {
    this.products = []
    this.path = path
  }

  async cargaProduct(){
    try{
      if(!fs.existsSync(this.path)){
        await this.addProduct('Producto1','Este es un producto de prueba',200,'Sin Imagen','abc123',25)
        await this.addProduct('Producto2','Este es un producto de prueba',300,'Sin Imagen','abc124',26)
        await this.addProduct('Producto3','Este es un producto de prueba',400,'Sin Imagen','abc125',27)
        await this.addProduct('Producto4','Este es un producto de prueba',500,'Sin Imagen','abc126',27)
        await this.addProduct('Producto5','Este es un producto de prueba',600,'Sin Imagen','abc127',28)
        await this.addProduct('Producto6','Este es un producto de prueba',700,'Sin Imagen','abc128',28)
        await this.addProduct('Producto7','Este es un producto de prueba',800,'Sin Imagen','abc129',29)
        await this.addProduct('Producto8','Este es un producto de prueba',900,'Sin Imagen','abc1210',95)
        await this.addProduct('Producto9','Este es un producto de prueba',1000,'Sin Imagen','abc111',55)
        await this.addProduct('Producto10','Este es un producto de prueba',1100,'Sin Imagen','abc112',85)
      }

    }catch (error){
      throw new Error('Error en carga de productos.')
    }
  }

  updateProduct(idProduct, newTitle, newDescripcion, newPrice, newThumbnail, newCode, newStock) {
    this.#readProduct()
    const foundedProduct = this.getProductByID(idProduct)
    if (foundedProduct) {
      this.deleteProduct(idProduct)
      const updatedProduct = {
        id: idProduct,
        title: newTitle,
        description: newDescripcion,
        price: newPrice,
        thumbnail: newThumbnail,
        code: newCode,
        stock: newStock
      }
      this.products.push(updatedProduct)
      fs.writeFileSync(this.path,JSON.stringify(this.products),'utf-8')
      console.log('El producto fue modificado')

    }

  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    this.#readProduct()
    if (title && description && price && thumbnail && code && stock) {
      if (this.products.find((product) => product.code === code)) {
        console.log('El codigo ya fue cargado')
      } else {

        const product = {
          id: this.#getMaxId() + 1,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        }

        this.products.push(product)
        fs.writeFileSync(this.path, JSON.stringify(this.products),'utf-8')
        console.log('se agrego un producto')
      }
    } else {
      console.log('Debe completar todos los campos del producto')
    }
  }

  getPruduct = () => {
    this.#readProduct()
    return this.products
  }

  getProductByID = (productID) => {
    this.#readProduct()
    const pruductFunded = this.products.find((product) => product.id === productID)
    if (pruductFunded) {
      return pruductFunded
    } else {
      console.log('Producto no Encontrado')
    }
  }

  deleteProduct(idProduct) {
    this.#readProduct()
    this.products = this.products.filter((prod) => prod.id !== idProduct)
    fs.writeFileSync(this.path, JSON.stringify(this.products),'utf-8')
  }


  #getMaxId = () => {
    let maxId = 0
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id
    })
    return maxId
  }

  #readProduct(){
    if(fs.existsSync(this.path)){
      const products = JSON.parse(fs.readFileSync(this.path),'utf-8')
      this.products = products
    }else{
      this.products = []
    }
  }
}

// const productManager = new ProductManager('./product.json')
// //Testing
// console.log(productManager.getPruduct())
// productManager.addProduct('producto prueba','Este es un prodcuto prueba',200,'Sin Imagne','abc123',25)
// console.log(productManager.getPruduct())
// console.log(productManager.getProductByID(2)) //buscamos un preducto que no existe
// console.log(productManager.getProductByID(1)) //buscamos un preducto que existe
// productManager.updateProduct(1,'producto actualizado','este es un producto actulizado',200,'sin imagen','asdd','30')
// productManager.deleteProduct(1)






