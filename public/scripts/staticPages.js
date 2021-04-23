//Cargar contenido almacenado
window.onload=()=>{
    showContent()
}

function showContent(){
    let title = window.location.pathname.split('/')
    fetch(`http://localhost:8081/admin/editor/${title[title.length-1]}`)
        .then(res=>res.json())
        .then(data=>{
            let contenedor = document.createElement('div')
            contenedor.innerHTML=data[0].content
            document.querySelector("#showContent").appendChild(contenedor)
        })
}