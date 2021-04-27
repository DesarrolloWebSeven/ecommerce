<template>
  <main class="product-page">
    <div class="product-card" v-if="productDetail">
      <div id="carousel" class="carousel slide product-photo" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img :src="'/images/' + productDetail.images[0]" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img :src="'/images/' + productDetail.images[1]" class="d-block w-100" />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev" >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="product-description">
        <h1>{{ productDetail.title }}</h1>
        <p id="price">{{ productDetail.price }} €</p>
        <p>{{ productDetail.description }}</p>
        <ul>
          <li>{{ productDetail.features[0] }}</li>
          <li>{{ productDetail.features[1] }}</li>
          <li>{{ productDetail.features[2] }}</li>
        </ul>
        <div class="product-buy">
          <input v-model="contador" type="number" min="1" :max=productDetail.quantity >
          <button @click="addToCart(productDetail)"><i class="fas fa-shopping-basket"></i></button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: "ProductCard",
  
  setup() {
    const route = useRoute()
    const store = useStore()
    let productDetail = ref()
    let contador = ref('1')
    
    const getDetailProduct = () => {     
      fetch(`http://localhost:8081/productos/id/${route.params.id}`)
        .then(res => res.json())
        .then(data => {
          productDetail.value = data
          productDetail.value.features = productDetail.value.features.split('/')
        })
        .catch(err => console.log(err));
    }
    getDetailProduct();

    const addToCart = (productDetail) => {
      productDetail.items = parseInt(contador.value)
      store.dispatch('addToCart', productDetail)
    }

    return {
      productDetail,
      contador,
      addToCart
    };
  },
};
</script>

<style lang="scss" scoped>
.product-page {
  width: 80%;
  max-width: 900px;
  margin: 160px auto 130px;

  .product-card {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .product-photo {
      padding: 15px;
      width: 325px;
      height: 325px;
      border: 1px solid rgb(168, 168, 168);
      border-radius: 5px;

        i {
          position: relative;
          z-index: 10;
          color: black;
          font-size: 2rem;
        }

      .carousel-control-prev {
        border: none;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        background-color: rgb(255, 255, 255);
      }

      .carousel-control-next {
        border: none;
        height: 65px;
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        background-color: rgb(255, 255, 255);
      }
    }

    .product-description {
      width: 60%;
      color: black;
      text-align: left;

      h1 {
        font-size: 2rem;
        font-weight: 900;
      }

      #price {
        color: rgb(104, 104, 104);
        font-size: 1.5rem;
        font-weight: 700;
      }

      p, li {
        font-size: 0.9rem;
      }

      .product-buy {
        display: flex;

      input[type=number]::-webkit-inner-spin-button {
        opacity: 1;
      }

      input {
        width: 30%;
        margin-right: 10px;
        border-radius: 10px;
        text-align: center;
        border: none;
        border: 1px solid gray;
      }

      button {
        width: 10%;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: gray;
        color: white;
        border: none;
      }
      }
    
    }
  }
}
</style>