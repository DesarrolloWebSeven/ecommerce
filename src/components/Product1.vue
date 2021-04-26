<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-3">
        <div class="card">
          <div class="card-horizontal justify-content-center row">
            <div class="img-square-wrapper col-12 col-lg-6 m-4">
              <img :src="'/images/'+product.images[0]" />
            </div>
            <div class="card-body col-12 col-lg-6">
              <h4 class="card-title">{{ product.title }}</h4>
              <p class="card-text">Stock: {{ product.quantity }}</p>
              <p class="card-text price">{{ product.price }} €</p>
              <div>
                <div>
                  <router-link to="/carrito">
                    <button @click="buy(product)">COMPRAR</button>
                  </router-link>
                </div>
                <router-link
                  :to="'/producto/id/' + product._id"
                  class="card-text"
                  ><button>VER</button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "Product",
  props: {
    product: Object,
  },
  setup() {
    const store = useStore();
    let contador = reactive({
      titulo: "Contador: ",
      valor: 1,
      uds: 1,
    });

    const buy = (product) => {
      product.items = parseInt(contador.uds);
      store.dispatch("addToCart", product, parseInt(contador.uds));
    }

    return {
      buy
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: none;
  margin: 20px;
  min-height: 600px;
  .card-horizontal {
    display: flex;
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
    @media (max-width: 576px) {
      img {
        width: 150px;
        height: 150px;
      }
    }
    button {
      color: #fff;
      background-color: black;
      padding: 10px;
    }
  }
}
</style>