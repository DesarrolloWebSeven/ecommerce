<template>
<div class="container section"> 
  <div v-if="success">
  <p>Tu cuenta ha sido confirmada con éxito</p>
  </div>
  <div v-else>
    <p>Esperando información</p>
  </div>
</div>
  
</template>

<script>

import { ref } from 'vue'
export default {
  name: "Confirmation",
  props: {
    id: String
  },
  setup(props){
    let success = ref()

    const confirm = () => {
      fetch(`http://localhost:8081/usuario/registro/${props.id}`)
          .then(res => res.json())
          .then(response => success.value = true)
    };
    confirm()

    return { 
      success
    }
}
}

</script>

<style lang="scss" scoped>
div {
  color: gray;
}
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
}

</style>