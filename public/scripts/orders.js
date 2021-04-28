window.onload=()=>{
  let buttonDelete = document.querySelectorAll('.orderDelete')
  buttonDelete.forEach( button => button.addEventListener('click', deleteOrder))

  function deleteOrder (e) {
    let id = e.target.dataset.id
    result = confirm("¿Seguro que desea eliminar este pedido?")
    
    if(result){
      fetch(`/admin/pedidos/${id}`,{ method:'DELETE' })
      .then(() => window.location.href = "/admin/pedidos")
      .catch(err => console.log(err.message))
    }
  }


  let search = document.querySelector('#search')
  search.addEventListener('keyup', searchItem)

  function searchItem (e) {
    const term = e.target.value.toLowerCase()
    const orders = document.querySelectorAll('.order-detail')
    orders.forEach( order => {
      let title = order.textContent.toLowerCase()
      if(title.includes(term)) order.style.display = 'flex'
      else order.style.display = 'none' 
    }) 
  }
  
}