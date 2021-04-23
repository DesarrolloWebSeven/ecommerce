window.onload=()=>{
  let button = document.querySelectorAll('.delete')
  button.forEach( item => {
    item.addEventListener('click', deleteProduct)
  })
}

function deleteProduct(e){
  let id = e.target.dataset.id
  result = confirm("¿Seguro que desea eliminar el producto?")
    if(result){
      fetch(`/admin/productos/${id}`,{ method:'DELETE' })
      window.location.href = "/admin/productos"
    }
} 