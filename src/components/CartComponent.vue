<template>
  <div>TOTAL: {{ calcTotal }}</div>
</template>

<script>
import { ref, reactive, computed} from "vue";
import {useStore} from 'vuex'

export default {
  name: "CartComponent",
  props: {},
  components: {},
  setup() {
    let store=useStore()

    const calcTotal = computed(() => {
      let total=0  
      /* datos.forEach(dato => {
        
        total+=dato.cantidad*dato.precio
        store.commit('setTotal', total)
      })  */  
      
      return total.toFixed(2)
      
    })


    return {
        calcTotal

    };
  },
};
</script>

<style>

</style>