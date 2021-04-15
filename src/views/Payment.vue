<template>

<h1 v-if="storage">Pago de la compra</h1>
<h1 v-else>Usuario no autorizado</h1>
  
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
    name:'Payment',
    setup(){ 
      let storage = ref('')

      onMounted(() => {
        storage.value = localStorage.getItem('token')
      })
      
        return{
          storage
        }
    }


}
</script>

<style lang="sass" scoped>

</style>