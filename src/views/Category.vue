<template>
<main class="category-page">
  <div class="category-banner">
    <img :src="'/logo/' + category + '-' + lang + '.png'" alt="">
  </div>
  <div class="category-main" v-if="products">
    <div v-for="(product, i) in products" :key="i">
    <Product class="category-product" :product="product" />
    </div>
  </div>
</main>
</template>

<script>
import { useStore } from "vuex";
import Product from "@/components/Product";
import { useRoute } from 'vue-router'
import { ref, watch, computed } from "vue";
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
      category,
      lang: computed(() => useStore().getters.getCurrentLang)      
    };
    
  },
};
</script>

<style lang="scss" scoped>
.category-page {
  width: 80%;
  margin: 0 auto;
  padding-top: 90px;

  .category-banner {
    width: 100%;
    margin-bottom: 20px;

    img {
      max-width: 100%;
    }
  }

  .category-main {
    margin: 40px 0 80px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 30px;

    .category-product {
      width: 100%;
    }

  }

  @media (max-width: 1000px) {

    .category-main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);

    .category-product {
      width: 100%;
    }
    }
  }

  @media (max-width: 700px) {

    .category-main {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(6, 1fr);

    .category-product {
      width: 100%;
    }
    }
  }
}

</style>