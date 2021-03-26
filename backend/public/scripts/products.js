console.log("Hola")

window.onload=()=>{
    showProducts()
}

function showProducts(){
    console.log("entramos a la funcion")
    fetch('/admin/productos/listar')
        .then(res=>res.json())
        .then(products=>{
            let productList = document.querySelector(".product-list")
            while(productList.firstChild)
                productList.firstChild.remove()
            products.forEach(product=>{
                let p = document.createElement("p")
                p.textContent=product.title
                productList.appendChild(p)
            })
        })
}
  
  
