$(document).ready(function(){
    //Asignacion de valores
    var _id = $("#id")[0].value
    var imagesOld = $("#images")[0].defaultValue.split(',')
    var imagesNew

    //Preparando contenedores
    var img = document.createElement('img')
        img.className="images-old"
    var btnImg = document.createElement('input')
        btnImg.type='button'
        btnImg.value='Eliminar'
        btnImg.className='delete-img-old'
    showImages(imagesOld)
 
    //Carga de imagenes existentes
    function showImages(imagesOld){
        $(".images")[0].innerHTML=""
        //Asignacion y carga
        imagesOld.forEach((image, i)=>{
            let myClon=img.cloneNode(true)
                myClon.src=image
                $('.images')[0].appendChild(myClon)
            let clonBtnImg=btnImg.cloneNode(true)
                clonBtnImg.name=image
                clonBtnImg.id="img-"+i
                $('.images')[0].appendChild(clonBtnImg)
        })
    }

    //Eliminacion de imagenes del array
    $(document).on('click','.delete-img-old', (e)=>{
        imagesOld.splice(imagesOld.findIndex(i=>i==e.target.name), 1)
        fetch(`/admin/productos/imagenes/${_id}`,{
            method:'DELETE',
            headers:{'Content-type':'Application/json'},
            body:JSON.stringify({
                _id:_id,
                image:e.target.name
            })
        })
        showImages(imagesOld)
    })
/*
    //Subiendo nuevas imagenes
    document.querySelector('#imagesNew').addEventListener('change', (e)=>{
        console.log(e.target.files)
        let prueba= Array.from(e.target.files)
        console.log(prueba)
        const data = new FormData()
        //data.append('images', archivos)

        fetch('/admin/productos/',{
            method:'PUT',
            files: JSON.stringify(prueba)
        })
        .then(response => response.json())
        .then(data => {
          document.getElementById('resultado').innerHTML = 'El archivo ' + data.path + ' se ha subido correctamente.'
        })
        .catch(error => {
          console.error(error)
        })
    })*/

/*
    $("#update").click((e)=>{
        //Datos del formulario actualizado
        let product_update={ 
            _id:_id, 
            title:$('input[name="title"]')[0].value,
            description:$('input[name="description"]')[0].value,
            features:$('input[name="features"]')[0].value,
            price:$('input[name="price"]')[0].value,
            category:$('select[name="category"]')[0].value, 
            quantity:$('input[name="quantity"]')[0].value,
            images:null,
            featured:$('input[name="featured"]')[0].checked
        }

        if (imagesOld.length==0)product_update.images=imagesNew
        else product_update.images=imagesOld

        fetch('/admin/productos',{
            method:'PUT',
            headers:{'Content-type':'Application/json'},
            body:JSON.stringify(product_update)
        }).then(res=>console.log("actualizado"))
    })*/
})
