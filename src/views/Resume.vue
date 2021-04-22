<template>
  <div class="container section">
    <div class="row d-flex justify-content-center">
      <ol id="progress-bar">
        <li class="step-done">Envío</li>
        <li class="step-active">Resumen</li>
        <li class="step-todo">Pago</li>
      </ol>
    </div>
    <div>


    <form class="section row g-3">
      <div class="col-12 col-md-8">
        <div v-for="(id, i) in Object.keys(cart)" :key="i" class="col-12">
        <div class="card row">
          <div class="card-horizontal row justify-content-center">
            
            <div
              id="carouselExampleIndicators"
              class="col-12 col-lg-6 m-4"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="">
                  <img
                    :src="cart[id].images[0]"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>

            <div class="card-body col-12 col-lg-6">
              <div class="d-flex flex-column align-items-start">
                <h4 class="card-title">{{ cart[id].title }}</h4>
                <p class="card-text">
                  <b>Precio unidad: </b> {{ cart[id].price }}
                </p>
                <p class="card-text">
                  <b>Cantidad en tu carrito: </b> {{cart[id].items}}
                  
                </p>
                <p class="card-text">
                  <b>Subtotal producto: </b>
                  {{ (cart[id].items * cart[id].price).toFixed(2) }}
                </p>
              </div>          
                          
            </div>
            <Total />
          </div>
        </div>
      </div>
      
      </div>
      <div class="col-md-4">
          
          <img class="avatar" src="@/assets/avatar.png" alt="">
        
        <p>{{datos.firstName}} {{datos.lastName}}</p>
        <p>{{datos.adress}}, {{datos.flat}}</p>
        <p>{{datos.postalCode}}, {{datos.city}} ({{datos.province}})</p>
        
        <button class="btn btn-danger">Editar</button>
      </div>   

      

      <div class="col-12">
        <router-link to="/carrito/pago"><p class="card-text"><button class="btn btn-success m-2">Pagar</button></p></router-link>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import Total from "@/components/Total";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Resume",
  props: {},
  components: {
    Total,
  },
  setup() {
    
    const store = useStore();
    const cart = computed(() => store.state.cart);  

    let datos=reactive(JSON.parse(localStorage.getItem('UserInfo')))
    console.log(datos)
    

    return {
      cart,
      datos
     
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
    background-color: white;
    #progress-bar{
        display: flex;
        justify-content: center;
    }
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
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
    #carouselExampleIndicators {
      max-height: 200px !important;
      max-width: 200px !important;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      align-items: left;
     }
    img {
      width: 200px;
      height: 200px;
      background-color: white;
      margin: 5px;
    }
    
    .disabledButton{
      pointer-events: none;
      
      i {
        color:gray;
      }
    }
    .disabledButton2{
      pointer-events: none;
      
      i {
        color:gray;
      }
    }
    i{
      cursor: pointer;
    }
  }
}

  // Colors
$default: #212121;
$grey: #efefef;
$main-color: #ff0000;

// Progress bar
#progress-bar {
  display: table;
  width: 100%;
  margin: 0;
  padding: 15px 15px 0;
  table-layout: fixed;
  width: 100%;
  counter-reset: step;
  li {
    list-style-type: none;
    display: table-cell;
    width: 20%;
    float: left;
    font-size: 16px;
    position: relative;
    text-align: center;
    &:before {
      width: 50px;
      height: 50px;
      color: $default;
      content: counter(step);
      counter-increment: step;
      line-height: 50px;
      font-size: 18px;
      border: 1px solid $grey;
      display: block;
      text-align: center;
      margin: 0 auto 10px auto;
      border-radius: 50%;
      background-color: #fff;
    }
    &:after {
      width: 100%;
      height: 10px;
      content: '';
      position: absolute;
      background-color: #fff;
      top: 25px;
      left: -50%;
      z-index: -1;
    }
    &:first-child:after {
      content: none;
    }
    &.step-done {
      color: $main-color;
      &:before {
        border-color: $main-color;
        background-color: $main-color;
        color: #fff;
        content: "\f00c";
        font-family: "FontAwesome";
      }
      & + li:after {
        background-color: $main-color;
      }
    }
    &.step-active {
      color: $main-color;
      &:before {
        border-color: $main-color;
        color: $main-color;
        font-weight: 700;
      }
    }
  }
}}
</style>