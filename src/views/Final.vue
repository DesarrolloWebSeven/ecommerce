<template>
  <div class="container section">
    <div class="row d-flex justify-content-center">
     <i class="far fa-check-circle fa-7x"></i>
     <p>La compra se ha realizado con éxito. Hemos enviado un resumen del pedido a tu correo electrónico. Si tienes cualquier duda o problema no dudes en ponerte en contacto con nosotrxs.</p>
     <span><router-link to="/" class="btn btn-primary">Inicio</router-link></span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Final",
};
</script>


<style lang="scss" scoped>
.section {
  background-color: #10555e1e;
  max-width: 80%;
  margin-top: 30px;
  color: black;

  .row {
    max-width: 95%;
    margin: 0 auto;
    background-color: white;
    #progress-bar {
      display: flex;
      justify-content: center;
    }
  }
  .fa-check-circle{
      color: rgb(92, 179, 92);
  }
}
</style>