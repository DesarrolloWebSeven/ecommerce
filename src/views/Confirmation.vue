<template>
<main class="confirmation-page"> 
  <div class="confirmation-text" v-if="success">
    <img src="/logo/welcome1.png" alt="Bienvenida a Geeky">
    <h1>¡Bienvenido a Geeky!</h1>
    <p>{{lang["success"]}}</p> 
  </div>
  <div class="confirmation-text" v-else>
    <p>{{lang["waitingInfo"]}}</p>
  </div>
</main>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
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
      lang: computed(()=>useStore().getters.getLang),
      success
    }
}
}

</script>

<style lang="scss" scoped>
.confirmation-page {
  width: 80%;
  min-height: 300px;
  max-width: 800px;
  margin: 120px auto;
  padding: 30px 50px;
  background-color: rgb(240, 239, 239);
  border-radius: 10px;
  color: rgb(104, 103, 103);

  img {
    max-width: 100%;
  }
}

</style>