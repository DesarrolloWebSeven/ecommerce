<template>
  <div class="container section">
    <div class="row">
      <h1 class="titleHome">Regalos para informaticxs</h1>
      
      <router-link to="/productos/camisetas" class="col-6 category">
        <div class="inner">Camisetas <div><img class="logoGeeky" src="../../public/images/images-1618226795740.png" alt=""> <img class="logoGeeky" src="../../public/images/images-1618226285755.png" alt=""></div> </div>
      </router-link>

      <router-link to="/productos/accesorios" class="col-6 category">
        <div class="inner">Accesorios <div><img class="logoGeeky" src="../../public/images/images-1618228602474.png" alt=""> <img class="logoGeeky" src="../../public/images/images-1618227834601.png" alt=""></div> </div>
      </router-link>

      <router-link to="/productos/tazas" class="col-6 category">
        <div class="inner">Tazas <div><img class="logoGeeky" src="../../public/images/images-1617973995105.png" alt=""> <img class="logoGeeky" src="../../public/images/images-1618225574181.png" alt=""></div></div>
      </router-link>

      <router-link to="/productos/games" class="col-6 category">
        <div class="inner">Juegos <div><img class="logoGeeky" src="../../public/images/images-1618230322660.jpg" alt=""><img class="logoGeeky" src="../../public/images/images-1618229687036.jpg" alt=""></div></div>
      </router-link>
      
    </div>


    
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Home",
  setup() {
    return {
      lang: computed(() => useStore().getters.getLang),
    };
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.section {  
  background-color: #10555e1e;
  max-width: 80%;
  margin-top: 30px;
  color: black;
  .row{
    max-width: 95%;
    margin:0 auto;
  }
  .category{
    text-transform: uppercase;
    color:white;
    padding: 0 5px 0 5px;
      
  }
  .category .inner {
    border-left: 8px solid black;
    border-bottom: 8px solid black;
    color: black;
    padding: 10px;
    margin-bottom: 20px;
    min-height: 100px;
    font-size: 30px;
    font-family: "Montserrat" !important;
    font-weight: bold;
    
}
  .titleHome{
    font-family:"Game" !important;
    font-size:50px;
    background-color: #0f606b;
    padding: 30px;
    border-top: 8px solid black;
    border-bottom: 8px solid black;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  img{
    width: 200px;
    height: 200px;
    background-color: white;
    margin: 5px;
  }
  
}
</style>
