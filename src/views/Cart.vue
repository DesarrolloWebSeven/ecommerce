<template>
<div class="container section">
    <div class="row">
        <CartComponent />
        <Total />
    </div>
</div>

</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import CartComponent from "@/components/CartComponent.vue";
import Total from "@/components/Total.vue";


export default {
  name: "Cart",
  props: {},
  components: {
    CartComponent,
    Total
  },
 
    setup(){
    const store = useStore()
    const cart = computed(() => store.state.cart)
    
  }
  
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
}
</style>