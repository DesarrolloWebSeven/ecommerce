var quill = new Quill('#editor', {
    modules: {
        syntax: true,
        toolbar: '#toolbar-container'
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
})

function save(){
    console.log(window.location.pathname)
    let title = window.location.pathname.split('/')
    console.log(title)
    let content = quill.container.firstChild.innerHTML
    console.log('Esto es lo que hay:', content)
    fetch(`/admin/pages/${title[2]}`,{
        method: 'POST',
        headers: {'Content-type':'Application/json'},
        body: JSON.stringify({content:content})
    })
}


//Cargar contenido almacenado
window.onload=()=>{
    showContent()
}

function showContent(){
    console.log("cargar contenido")
    fetch('/')
}