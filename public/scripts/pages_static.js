console.log("Estoy en pagina proyecto")


var quill = new Quill('#editor', {
    modules: {
        syntax: true,
        toolbar: '#toolbar-container'
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
})

function save(){
    let content = quill.container.firstChild.innerHTML
    console.log('Esto es lo que hay:', content)
    fetch('/admin/project',{
        method: 'POST',
        headers: {'Content-type':'Application/json'},
        body: JSON.stringify({content:content})
    })
}
