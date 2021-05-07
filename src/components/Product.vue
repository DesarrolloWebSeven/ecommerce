<template>
  <main v-if="product" class="product-card">
    <div class="product-img">
      <img :src="'/images/' + product.images[0]" />
    </div>
    <div class="product-info">
      <div class="product-title">
        <h2>{{ product.title }}</h2>
        <p>{{ product.price }} €</p>
      </div>
      <div class="product-icons">
        <div @click="buy(product)" class="icon"><i class="fas fa-shopping-basket"></i></div>
        <router-link :to="'/producto/id/' + product._id" class="icon">
          <i class="fas fa-info"></i>
        </router-link>
      </div>
    </div>
  </main>
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
.product-card {
  box-sizing: border-box;
  width: 30%;
  min-height: 330px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgb(235, 232, 232);
  box-shadow: 2px 2px 10px rgb(235, 233, 233);

    img {
      max-width: 90%;
    }

    .product-info {
      margin: 15px 20px 10px;
      padding-bottom: 0;
      display: flex;
      justify-content: space-between;
      color: rgb(99, 98, 98);
      text-align: left;

      .product-title {

        h2 {
          font-size: 0.7rem;
          font-weight: 600;
          margin-bottom: 3px;
        }

        p {
          margin: 0; 
          padding: 0;
          font-size: 1.1rem;
          font-weight: bold;
          color: black;
        }

      }

    }

  .product-icons {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: start;

    .icon {
      cursor: pointer;
      width: 35px;
      height: 35px;
      border-radius: 5px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon:first-child {
      background-color: #FFC61A;
      margin-right: 5px;
    }

    .icon:nth-child(2) {
      background-color: #65BAF7;
    }
  }
}

</style>