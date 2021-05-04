<template>
  <main class="main-content">
    <section class="cookies-page">
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
    </section>
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
.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

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