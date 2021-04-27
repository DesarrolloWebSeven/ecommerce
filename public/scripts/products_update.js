$(document).ready(function(){
    //Asignacion de valores
    var _id = $("#id")[0].value
    var imagesOld = $("#images")[0].defaultValue.split(',')

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
})
