<template>
<div class="container section">
    <div class="row">
        <CartComponent />
    </div>
</div>

</template>

<script>

import CartComponent from "@/components/CartComponent.vue";

export default {
  name: "Cart",
  props: {},
  components: {
    CartComponent,
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
}
</style>