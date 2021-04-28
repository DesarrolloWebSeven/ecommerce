window.onload=()=>{

  let iconDelete = document.querySelectorAll('.fa-times-circle')
  iconDelete.forEach( icon => icon.addEventListener('click', deleteProduct))

  console.log(iconDelete)

  function deleteProduct(e) {

    let id = document.querySelector('#items').dataset.id
    let product = e.target.dataset.product
    let confirmation = confirm('¿Estás seguro de eliminar esta foto?')

    if(confirmation) {
      fetch(`http://localhost:8081/admin/borrado/${id}`, {
        method:'DELETE',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify({product})
      })
      .then( () => e.target.parentNode.style.display = 'none')
      .catch(err => console.log(err.message))
    }



  } 
  
}