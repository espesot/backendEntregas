import fs from 'fs'

class ProductManager {
  constructor(path) {
    this.products = []
    this.path = path
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

const productManager = new ProductManager('./product.json')
//Testing
console.log(productManager.getPruduct())
productManager.addProduct('producto prueba','Este es un prodcuto prueba',200,'Sin Imagne','abc123',25)
console.log(productManager.getPruduct())
console.log(productManager.getProductByID(2)) //buscamos un preducto que no existe
console.log(productManager.getProductByID(1)) //buscamos un preducto que existe
productManager.updateProduct(1,'producto actualizado','este es un producto actulizado',200,'sin imagen','asdd','30')
productManager.deleteProduct(1)






