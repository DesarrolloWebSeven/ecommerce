<template>
<div class="container section"> 
  <label>{{lang["titleNotFound"]}}</label>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: "NotFound",
  setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }
}

</script>


<style lang="scss" scoped>
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
  color: black;
}

</style>