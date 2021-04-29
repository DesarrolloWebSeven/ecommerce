window.onload=()=>{
  
  let search = document.querySelector('#search')
  search.addEventListener('keyup', searchItem)

}

const searchItem = (e) => {
  
  const term = e.target.value.toLowerCase()
  const clients = document.querySelectorAll('.card')
  clients.forEach( client => {
    let title = client.textContent.toLowerCase()
    if(title.includes(term)) client.style.display = 'block'
    else client.style.display = 'none' 
  })
  
}