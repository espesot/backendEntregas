class ProductManager {
  constructor() {
    this.products = []
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
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
        console.log('se agrego un producto')
      }
    } else {
      console.log('Debe completar todos los campos del producto')
    }
  }

  getPruduct = () => {
    return this.products
  }

  getProductByID=(productID)=>{
    const pruductFunded = this.products.find((product) => product.id === productID)
    if(pruductFunded){
      return pruductFunded
    }else{
      console.log('Producto no Encontrado')
    }
  }



  #getMaxId = () => {
    let maxId = 0
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id
    })
    return maxId
  }
}

const productManager = new ProductManager()
//Testing
console.log(productManager.getPruduct())

productManager.addProduct('producto prueba','Este es un prodcuto prueba',200,'Sin Imagne','abc123',25)

console.log(productManager.getPruduct())

productManager.addProduct('producto prueba','Este es un prodcuto prueba',200,'Sin Imagne','abc123',25)

console.log(productManager.getProductByID(5))
console.log(productManager.getProductByID(1))







// productManager.addProduct('producto2','prodcuto22p',50,'/eee/ddd','a2',20)
// productManager.addProduct('producto3','prodcuto333p',60,'/fff/ddd','a3',30)
// productManager.addProduct('producto4','prodcuto444p',70,'/ggg/ddd','a4',40)

// //muestro productos cargados
// console.log(productManager.getPruduct())

// //error de carga de producto faltan campos
// productManager.addProduct('prodcuto444p,/ggg/ddd','a4',40)

// //error 
