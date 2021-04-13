<template>
  <div class="container">
    <div class="row">
      <div class="col-6"><img :src="product.images[0]" /></div>
      <div class="col-6">
        <div class="row">{{ product.title }}</div>
        <div class="row">{{ product.description }}</div>
        <div class="row"><button>comprar</button></div>
      </div>
      

      
    </div>
  </div>

  
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Product",
  props: {
    product: Object,
  },
  setup(props) {
    let product = reactive(props.product);
    console.log(product);
    return {
      product,
    };
  },
};
</script>

<style>
</style>