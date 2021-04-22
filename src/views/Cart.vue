<template>
  <div class="container section">
    <div v-if="Object.keys(cart).length" class="row">
      <CartComponent />
      <span><button class="btn btn-danger m-2" @click="emptyCart">Vaciar carrito</button></span>
      <router-link to="/carrito/envio"><p class="card-text"><button class="btn btn-success m-2">TRAMITAR PEDIDO</button></p></router-link>
      <Total />
      
    </div>

    <div v-else class="row"><h2>Todavia no tienes nada en el carrito</h2></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CartComponent from "@/components/CartComponent.vue";
import Total from "@/components/Total.vue";

export default {
  name: "Cart",
  props: {},
  components: {
    CartComponent,
    Total,
  },

  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart);
    const emptyCart = () => {store.commit('setEmptyCart')}

    return { 
      cart,
      emptyCart
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
    margin-top:20x;
    

  }
}
</style>