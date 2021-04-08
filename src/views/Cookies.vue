<template>
<div class="section">
  <h1>Estas son nuestras Cookies</h1>
  <p><strong>Cookies</strong></p>
<p>Nuestro sitio web usa cookies. Una cookie es un fichero que contiene un identificador (una cadena de letras y números) que se envía desde un servidor web a un navegador web y se almacena en el navegador. El identificador es enviado de vuelta al servidor cada vez que el navegador solicita una página del servidor. Las cookies pueden ser “persistentes” o de “sesión”. Una cookie persistente será almacenada por una navegador web y permanecerá válida hasta su fecha de caducidad, a menos que el usuario la elimine antes de la fecha de caducidad. Una cookie de sesión caducará al final de la sesión del usuario, cuando se cierre el navegador. Las cookies típicamente no contienen ninguna información que identifique personalmente al usuario sino información personal que almacenamos sobre usted que puede relacionarse con la información almacenada y obtenida de las cookies. Solo usamos cookies de sesión y persistentes en nuestro sitio web.</p>
<ol>
<li>Los nombres de las cookies que podemos usar en nuestro sitio web y los fines para las que son usadas, están especificadas a continuación:
<ol>
<li>Usamos Google Analytics y Adwords en nuestro sitio web para reconocer un ordenador cuando un usuario visita el sitio web; monitoriza usuarios mientras navegan por el sitio web; permitir el uso de un carrito de compras en el sitio web; mejora la usabilidad del sitio; analizar el uso del sitio web; administrar el sitio web; evitar fraude y mejorar la seguridad del sitio web; personalizar el sitio web para cada usuario; personalizar los anuncios que sean de interés particular a usuarios específicos.</li>
</ol>
</li>
<li>La mayoría de navegadores permiten que te niegues a aceptar cookies </li>

<li>Puedes eliminar las cookies ya almacenadas en tu ordenador, por ejemplo:

</li>
<li>Eliminar las cookies tendrá un impacto negativo en la usabilidad de muchos sitios web.</li>
</ol>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    name:'Cookies',
    setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }

}
</script>

<style lang="scss" scoped>
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
  padding:20px;
  background-color: #3F3F3F;
  text-align: left;
  color:white;
  border-radius:10px;
  
  
  
}
</style>