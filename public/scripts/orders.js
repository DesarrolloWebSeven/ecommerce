window.onload=()=>{
/*   let button = document.querySelectorAll('.delete')
  button.forEach( item => {
    item.addEventListener('click', deleteProduct)
  }) */

  let search = document.querySelector('#search')
  search.addEventListener('keyup', searchItem)

}

/* const deleteProduct = (e) => {
    let id = e.target.dataset.id
    result = confirm("¿Seguro que desea eliminar el producto?")
      if(result){
        fetch(`/admin/productos/${id}`,{ method:'DELETE' })
        window.location.href = "/admin/productos"
      }
  }  */
  
  const searchItem = (e) => {
    const term = e.target.value.toLowerCase()
    const orders = document.querySelectorAll('.order-detail')
    orders.forEach( order => {
      let title = order.textContent.toLowerCase()
      if(title.includes(term)) order.style.display = 'flex'
      else order.style.display = 'none' 
    }) 
  }