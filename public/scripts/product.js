window.onload=()=>{
  
  let imagesArray = document.querySelector('#images')
  images = imagesArray.value.split(',')

  let photos = document.querySelectorAll('.photo-icon')
  photos.forEach(item => item.addEventListener('click', deleteImage))
  
  function deleteImage(e) {
    let img = e.target.dataset.id
    if(images.length > 1) images.splice(images.indexOf(img), 1)
    else images.splice(0)
    imagesArray.value = images
    if(confirm('Está seguro de eliminar esta imagen')) {
      e.target.parentNode.classList.add('hidden')
      fetch(`http://localhost:8081/admin/${img}`, { method:'DELETE' })
        .then( data => console.log('Imagen borrada'))
    }
  }
}

