<template>
<main class="notfound-page">
  <img src="/logo/404error.jpg" alt="">
  <h1>{{lang["titleNotFound"]}}</h1>
  <button><router-link to="/">Inicio</router-link></button>
</main>
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
.notfound-page {
  margin: 60px auto;
  width: 80%;
  max-width: 800px;

  img {
    max-width: 100%;
  }

  h1 {
    color: black;
    font-size: 1.7rem;
    font-weight: 600;
  }

  button {
    width: 20%;
    border: none;
    border-radius: 5px;
    padding: 5px 0;
    margin-top: 10px;
    background-color: #22B573;

    a {
      text-decoration: none;
      color: white;
    }
  }

  button:hover {
    opacity: 60%;
  }
}

  @media (max-width: 850px) {

    .notfound-page {
      width: 90%;
      margin: 190px auto;

      button{
        width: 90%;
      }
    }

  }
</style>