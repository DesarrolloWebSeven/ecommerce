<template>
<main class="cookies-page">
  <h1>{{ lang["thisCookies"] }}</h1>
  <h2>{{ lang["titleCookies"] }}</h2>
  <p>{{ lang["pCookies"] }}</p>
  <ol>
    <li>{{ lang["li1"] }}</li>
    <li>{{ lang["li2"] }}</li>
    <li>{{ lang["li3"] }}</li>
    <li>{{ lang["li4"] }}</li>
    <li>{{ lang["li5"] }}</li>
  </ol>
</main>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    name:'Cookies',
    setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }

}
</script>

<style lang="scss" scoped>
.cookies-page {
  margin: 120px auto 90px;
  width: 80%;
  color: rgb(99, 98, 98);
  text-align: left;

  h1, h2 {
    color: black;
  }

  h2 {
    margin-bottom: 20px;
  }

  li {
    margin-bottom: 10px;
  }
}
</style>