<template>
  <!-- <pre>
    {{cart}}
  </pre> -->

  <div class="container section">
    <div class="row">
      <div v-for="(id, i) in Object.keys(cart)" :key="i" class="col-12 m-3">
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
                  <button
                    :class="{disabledButton: cart[id].quantity==cart[id].items}"
                    class="btn"
                    style="background: none; color: black"
                    @click="cart[id].items<cart[id].quantity ?cart[id].items++ :null"
                  >
                    <i class="fas fa-plus-circle"></i></button
                  >
                  <button
                    :class="{disabledButton2: cart[id].items==1} "
                    class="btn"
                    style="background: none; color: black"
                    @click="cart[id].items>0 ?cart[id].items-- :null"
                  >
                    <i class="fas fa-minus-circle"></i>
                  </button>
                </p>
                <p class="card-text">
                  <b>Subtotal producto: </b>
                  {{ (cart[id].items * cart[id].price).toFixed(2) }}
                </p>
              </div>
              
              <!--<p class="card-text price">{{ (contador.uds*cart.price).toFixed(2) }} € <input :value=contador.uds @change="updatePrice(cart.price, $event)" type="number" name="cantidad"  min="1" :max=cart.quantity ></p>
              
                <router-link to="/carrito"><p class="card-text"><button @click="addToCart(productDetail)">COMPRAR</button></p></router-link> -->
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Total from "@/components/Total";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CartComponent",
  props: {},
  components: {
    Total,
  },
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart);
   

    return {
      cart,
    };
  },
};
</script>

<style lang="scss" scoped>
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
  }
}
</style>