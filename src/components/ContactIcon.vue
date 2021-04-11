<template>
  <div class="d-flex justify-content-end">
      <!-- <router-link to="/ayuda"><i class="fas fa-comments fa-3x"></i></router-link> -->
      <i class="fab fa-whatsapp fa-3x"></i>
  </div>
</template>

<script>

import { ref, reactive, computed } from "vue"; 
export default {
    name:'ContactIcon',
    props: {},
  
  

}
</script>

<style lang="scss" scoped>
i{
    margin: 10px;
    /* color:#0F606B; */
    color: #FFF952;
    
}

</style>