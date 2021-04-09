<template>
  <h1>Esta es la página de  descripción del proyecto</h1>
  <label>{{lang["lang-label"]}}</label>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    name:'Proyect',
    setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>