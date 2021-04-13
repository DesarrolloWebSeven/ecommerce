window.onload=()=>{
    showProducts()
}

function showProducts(){
    fetch('/admin/productos/listar')
        .then(res=>res.json())
        .then(products=>{
            console.log(products)
            let productList = document.querySelector(".product-list")
            while(productList.firstChild)
                productList.firstChild.remove()
            products.forEach((product, i)=>{
                let card = document.createElement("div")
                let img = document.createElement("img")
                let h2 = document.createElement("h2")
                let p = document.createElement("p")
                let quantity = document.createElement("h5")
                let edit = document.createElement("button")
                    edit.className = "btn btn-edit"
                    edit.id=product._id
                    edit.onclick=`location.href="https://localhost/admin/productos/${product._id}"`
                let del = document.createElement("button")
                let cfooter = document.createElement("div")

                img.src=product.images[0]
                h2.textContent=product.title
                p.textContent=product.description
                quantity.textContent="Stock: " + product.quantity + " unidades"
                edit.textContent="Editar"
                del.textContent="Borrar"
                card.className = "card-product"
                img.className = "card-img"
                h2.className ="title"
                cfooter.className = "card-footer"

                del.className = "btn btn-delete"
                quantity.className = "card-featured"
                productList.appendChild(card)
                card.appendChild(img)
                card.appendChild(h2)
                card.appendChild(p)
                card.appendChild(quantity)
                card.appendChild(cfooter)
                cfooter.appendChild(edit)
                cfooter.appendChild(del)
            })


        })
}