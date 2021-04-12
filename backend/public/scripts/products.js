window.onload=()=>{
    showProducts()
}

function showProducts(){
    fetch('/admin/productos/listar')
        .then(res=>res.json())
        .then(products=>{
            let productList = document.querySelector(".product-list")
            while(productList.firstChild)
                productList.firstChild.remove()
            products.forEach(product=>{
                let img = document.createElement("img")
                let p = document.createElement("p")
                img.src=product.images[0]
                p.textContent=product.title
                productList.appendChild(img)
                productList.appendChild(p)
            })
        })
}


  
