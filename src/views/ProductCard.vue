<template>
  <div class="container section">
    <div class="row">
      <div class="col-12 m-3">
        <div class="card row">
          <div class="card-horizontal row justify-content-center" v-if="productDetail">
            <div
              id="carouselExampleIndicators"
              class="carousel slide col-12 col-lg-6 m-4"
              data-bs-ride="carousel"
            >
              
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    :src="productDetail.images[0]"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    :src="productDetail.images[1]"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>

            <div class="card-body col-12 col-lg-6">
              <h4 class="card-title">{{ productDetail.title }}</h4>
              <p class="card-text"><b>Descripción: </b> {{ productDetail.description }}</p>
              <p class="card-text"><b>Características técnicas: </b> {{ productDetail.features }}</p>
              <p class="card-text"><b>Stock: </b> {{ productDetail.quantity }}</p>
              <p class="card-text"><b>Precio unidad: </b> {{productDetail.price}}</p>
              <p class="card-text price">{{ (contador.uds*productDetail.price).toFixed(2) }} € <input :value=contador.uds @change="updatePrice(productDetail.price, $event)" type="number" name="cantidad"  min="1" :max=productDetail.quantity ></p>
              <div>
                <router-link to="/carrito"><p class="card-text"><button @click="addToCart(productDetail)">COMPRAR</button></p></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import {useRoute} from 'vue-router'

import {useStore} from 'vuex'
export default {
  name: "ProductCard",
  
  setup() {
    //:src="productDetail.images[0]"
    const route= useRoute()
    const store= useStore()
    let productDetail = ref()
    let contador=reactive({
          titulo: 'Contador: ',
          valor: 1,
          uds: 1
      })
    
    function getDetailProduct() {     
      fetch(`http://localhost:8081/productos/id/${route.params.id}`)
        .then((res) => res.json())
        .then((data) => (productDetail.value = data))
        .catch((err) => console.log(err));
    }

    getDetailProduct();
    console.log(productDetail);

    function updatePrice(price, event){
      console.log("event taget", event.target.value)
      contador.valor= (price*event.target.value).toFixed(2)
      contador.uds=event.target.value
    }

    function addToCart(productDetail){
      productDetail.quantity=parseInt(contador.uds)
     
      store.dispatch('addToCart', productDetail, parseInt(contador.uds))
    

    }

    return {
      productDetail,
      updatePrice,
      contador,
      addToCart
      
    };
  },
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
  }
  .titleHome {
    font-family: "Game" !important;
    font-size: 50px;
    background-color: #0f606b;
    padding: 30px;
    margin-bottom: 30px;
    margin-top: 30px;
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
.card {
  border: none;
  margin: 20px;
  .card-horizontal {
    display: flex;
    flex: 1 1 auto;
    color: black;
    
    .card-title {
      text-transform: uppercase;
      font-weight: bold;
    }
    #carouselExampleIndicators{
        max-height: 200px !important;
        max-width: 200px !important;
    }
    .carousel-control-prev, .carousel-control-next{
        height: 30px;
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
</style>