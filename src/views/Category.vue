<template>
  <div class="container section" v-if="products">
    <h1 class="titleHome">{{products.title}}</h1>
    <div class="row">
      
      <div 
        v-for="(product, i) in products"
        :key="i"
        class="col-12 col-xl-6 col-lg-6"
      >
        <Product :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product";
import {useRoute} from 'vue-router'
import { ref, reactive, onMounted, watch} from "vue";
export default {
  name: "Category",
  components: {
    Product,
  }, 
 
  setup() {
    const route= useRoute()
    let products = reactive([]);
    
   
    
    watch(()=> route.params,
      async newParams=> {
  
        products.arr= await getProducts(newParams.category)
        products.title= route.params.category
      })

    function getProducts(category) {      
        products.splice(0)
        fetch(`http://localhost:8081/productos/${category}`)
        .then((res) => res.json())
        .then((data) => data.forEach((item) => products.push(item)))
        .catch((err) => console.log(err));   
        
    }

    onMounted(()=>{ 
      getProducts(route.params.category)
      products.title= route.params.category.toUpperCase()
    })

    
    

    return {
      products
      
     
      
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

  @media (max-width: 576px) {
    .titleHome {
      font-size: 25px;
    }
  }
}
</style>