const socket = io()

socket.on('products', (data) => {
  renderList(data)

})
const renderList = (productsList)=>{
  let list = ''
  
  productsList.forEach((product)=>{
    list += `<li>id: ${product.id}</li>
            <ul>
              <li>title: ${product.title}</li>
              <lid>description: ${product.description}</li>
              <li>code: ${product.code}</li>
              <li>price: ${product.price}</li>
              <li>status: ${product.status}</li>
              <li>stock: ${product.stock}</li>
              <li>category: ${product.category}</li>
              <li>thumbnails: ${product.thumbnails}</li>
            </ul>`
  })
  document.querySelector('#productsList').innerHTML = list
}
