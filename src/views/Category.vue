<template>
  <div class="container section">
    <div class="row">
      <h1 class="titleHome">Camisetas {{products.category}}</h1>
      <div
        v-for="product in products"
        :key="product.index"
        class="col-12 col-md-6"
      >
        <Product :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product";
import { reactive, onMounted, onUnmounted } from "vue";
export default {
  name: "Category",
  components: {
    Product,
  },
  props: {
    category: String,
  },
  setup(props) {
    let products = reactive([]);
    
    onMounted(()=>{   
      fetch(`http://localhost:8081/productos/${props.category}`)
        .then((res) => res.json())
        .then((data) => data.forEach((item) => products.push(item)))
        .catch((err) => console.log(err));        
    })

    onUnmounted(()=>{
      products.splice(0)      
    })
    

    return {
      products,
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
    border-top: 8px solid black;
    border-bottom: 8px solid black;
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
</style>