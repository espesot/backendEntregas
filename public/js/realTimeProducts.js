const socket = io()

socket.on('products', (data) => {
  renderList(data)
})

const renderList = (productList)=>{
  let list = ''
  productList.forEach((prodcut)=>{
    list += `<li> id: ${prodcut._id}</li>
              <ul>
                <li>title: ${prodcut.title}</li>
                <li>description: ${prodcut.description}</li>
                <li>code: ${prodcut.code}</li>
                <li>pricce: ${prodcut.price}</li>
                <li>status: ${prodcut.status}</li>
                <li>stock: ${prodcut.stock}</li>
                <li>category: ${prodcut.category}</li>
                <li>thumbnails: ${prodcut.thumbnails}</li>
              </ul>`
  })  
  document.querySelector('#productList').innerHTML = list
}