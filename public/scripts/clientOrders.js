window.onload=()=>{
  
    let search = document.querySelector('#search')
    search.addEventListener('keyup', searchItem)
  
  }
  
  const searchItem = (e) => {
    
    const term = e.target.value.toLowerCase()
    const orders = document.querySelectorAll('.order-detail')
    orders.forEach( order => {
      let title = order.textContent.toLowerCase()
      if(title.includes(term)) order.style.display = 'flex'
      else order.style.display = 'none' 
    })
    
  }