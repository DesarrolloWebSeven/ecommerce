<template>
  <main class="main-content">
    <section class="cart-page">
      <h1>{{lang["cart"]}}</h1>
      <div class="cart-group">
        <div v-if="Object.keys(cart).length">
          <CartComponent />
          <p class="cart-price">TOTAL: {{(totalPrice).toFixed(2)}} €</p>
          <div class="cart-buttons">
          <button class="empty-button" @click="emptyCart">{{lang["emptyCart"]}}</button>
          <button class="buy-button"><router-link to="/carrito/envio">{{lang["process"]}}</router-link></button>
          </div>
        </div>
        <div class="empty-cart" v-else>
          <img src="/logo/emptycart.jpg" />
          <h2>{{lang["yourCartEmpty"]}}</h2>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CartComponent from '@/components/CartComponent.vue'

export default {
  name: "Cart",
  props: {},
  components: {
    CartComponent,
  },
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart);
    const emptyCart = () => {
      store.commit('setEmptyCart')
      localStorage.removeItem('cart')
    }
    const totalPrice = computed(() => store.getters.totalPrice)     

    return { 
      lang: computed(()=>useStore().getters.getLang),
      cart,
      totalPrice,
      emptyCart
    };
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-page {
  margin: 100px auto;
  width: 80%;
  max-width: 700px;
  color: rgb(99, 98, 98);

  @media (max-width: 850px) {
    .cart-page {
      width: 90%;
    }
  }

  h1 {
    color: black;
    text-align: center;
    margin-bottom: 30px;
  }

  .cart-group {

    .cart-price {
      width: 100%;
      text-align: right;
      padding-top: 10px;
      border-top: 2px solid black;
      color: black;
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 25px;
    }

    .cart-buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      button {
        width: 20%;
        border: none;
        padding: 5px 0;
        border-radius: 10px;
        color: white;
      }

      @media (max-width: 850px) {
        
          button {
            width: 48%;
          }
      }

      button:hover {
        opacity: 60%;
      }

      .empty-button {
        margin-right: 10px;
        background-color: #FFC61A;
      }

      .buy-button {
        background-color: #22B573;
      }

      a {
        color: white;
        text-decoration: none;
      }
    }
  }
}

.empty-cart {

  h2 {
    font-size: 1.4rem;
  }

  img {
    max-width: 100%;
  }

}

@media (max-width: 500px) {
  .empty-cart {
    margin: 50px auto 120px;
  }
}


</style>