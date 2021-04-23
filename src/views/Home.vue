<template>
  <div class="container section">
    <div class="row">
      <h1 class="titleHome">Regalos para informáticxs</h1>

      <router-link to="/productos/camisetas" class="col-12 col-md-6 mt-3">
        <div class="card">
          <div class="card-horizontal">
            <div class="card-body">
              <h4 class="card-title">Camisetas</h4>
            </div>
            <div class="img-square-wrapper">
              <div class="">
                <!-- <img
                  class="logoGeeky"
                  src="../../public/images/images-1618226795740.png"
                  alt=""
                />
                <img
                  class="logoGeeky"
                  src="../../public/images/images-1618226285755.png"
                  alt=""
                /> -->
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <router-link to="/productos/accesorios" class="col-12 col-md-6 mt-3">
        <div class="card">
          <div class="card-horizontal">
            <div class="card-body">
              <h4 class="card-title">Accesorios</h4>
            </div>
            <div class="img-square-wrapper">
              <div>
               <!--  <img
                  class="logoGeeky"
                  src="../../public/images/images-1618228602474.png"
                  alt=""
                />
                <img
                  class="logoGeeky"
                  src="../../public/images/images-1618227834601.png"
                  alt=""
                /> -->
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <router-link to="/productos/tazas" class="col-12 col-md-6 mt-3">
        <div class="card">
          <div class="card-horizontal">
            <div class="card-body">
              <h4 class="card-title">Tazas</h4>
            </div>
            <div class="img-square-wrapper">
              <div>
                <!-- <img
                  class="logoGeeky"
                  src="../../public/images/images-1617973995105.png"
                  alt=""
                />
                <img
                  class="logoGeeky"
                  src="../../public/images/images-1618225574181.png"
                  alt=""
                /> -->
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <router-link to="/productos/games" class="col-12 col-md-6 mt-3">
        <div class="card">
          <div class="card-horizontal">
            <div class="card-body">
              <h4 class="card-title">Juegos</h4>
            </div>
            <div class="img-square-wrapper">
              <div>
                <!-- <img
                  class="logoGeeky"
                  src="../../public/images/images-1618230322660.jpg"
                  alt=""
                /><img
                  class="logoGeeky"
                  src="../../public/images/images-1618229687036.jpg"
                  alt=""
                /> -->
              </div>
            </div>
          </div>
        </div>
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
  .titleHome {
    font-family: "Game" !important;
    font-size: 50px;
    background-color: #0f606b;
    padding: 30px;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .row {
    max-width: 95%;
    margin: 0 auto;
  }
  .card {
    border: none;
    margin: 20px;
    .card-horizontal {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      color: black;
      
      .card-title {
        text-transform: uppercase;
        font-weight: bold;
      }

      .card-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        .price {
          background-color: #0f606b;
          padding: 5px;
          color: white;
        }
      }
      img {
        width: 200px;
        height: 200px;
        background-color: white;
        margin: 5px;
      }
      button {
        color: #fff;
        background-color: black;
        padding: 10px;
      }
    }
  }
  @media (max-width: 600px) {
    .titleHome {
      font-size: 40px;
    }
  }

  @media (max-width: 530px) {
    .titleHome {
      font-size: 25px;
    }
  }
}
</style>
