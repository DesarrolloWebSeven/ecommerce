<template>
<main>
  <div class="main-banner">
    <img :src="'/logo/' + category + '.png'" alt="">
  </div>
  <div v-if="products">
    <div v-for="(product, i) in products" :key="i">
    <Product :product="product" />
    </div>
  </div>
</main>
</template>

<script>
import Product from "@/components/Product";
import { useRoute } from 'vue-router'
import { ref, watch } from "vue";
export default {
  name: "Category",
  components: {
    Product,
  }, 
  setup() {
    const route= useRoute()
    const category = ref(route.params.category)
    let products = ref([])

    watch(()=> route.params,
      async newParams=> {        
        products.arr= await getProducts(newParams.category)
        category.value = route.params.category
    })

    const getProducts = (category) => {     
        fetch(`http://localhost:8081/productos/${category}`)
        .then(res => res.json())
        .then(data => products.value = data)
        .catch(err => console.log(err))
    }
    getProducts(category.value)

    return {
      products,
      category
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  padding-top: 90px;
}
.main-banner {
  width: 80%;
  margin: 0 auto;

  img {
    max-width: 100%;
  }
}
</style>