<template>
  <section class="cookies">
    <h2 class="cookies__titulo">¿Aceptas nuestras Cookies?</h2> 
    <p class="cookies__texto">Usamos cookies para mejorar tu experiencia en la web.</p>
    <div class="cookies__botones">
        <button class="cookies__boton cookies__boton--no" @click="denyCookies">No</button>
        <button class="cookies__boton cookies__boton--si" @click="acceptCookies">Si</button>
    </div>
</section>

</template>

<script>
export default {
    name:'AlertCookies',
    setup(){

        function acceptCookies(){
            var el = document.querySelector(".cookies");
            el.style.display="none"
        
        }
        function denyCookies(){

        }

        return{
            acceptCookies

        }
    }
}
       
    
</script>

<style lang="scss" scoped>
.cookies {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: black;
    color: white;
    font-family: arial;
    text-align: center;
}

.cookies__boton {
    background: initial;
    border: 2px solid white;
    padding: 1rem;
    font-size: 1rem;
    color: white;
    width: 5rem;
    text-align: center;
}

</style>