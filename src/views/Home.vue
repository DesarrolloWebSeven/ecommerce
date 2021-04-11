<template>
  <div class="container section">
    <div clas="row">
        <img class="col-12 icono" src="@/assets/imgHome.png">
    </div>
    
    
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Home',
  setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  },
  components: {
    
    
  }
}
</script>
<style lang="scss" scoped>
.section{
  max-width: 80%;
 
  
  
   
}

</style>
