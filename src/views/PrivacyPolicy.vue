<template>
  <h1>Esa es la página de política de privacidad
  </h1>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    name:'PrivacyPolicy',
    setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>