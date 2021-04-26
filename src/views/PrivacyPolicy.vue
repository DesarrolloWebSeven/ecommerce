<template>
<main class="privacy-page">
  <h1>{{ lang["titlePrivacy"] }}</h1>
  <h2>A. {{ lang["titleA"] }}</h2>
  <ol>
    <li>{{ lang["introLi1"] }}</li>
    <li>{{ lang["introLi2"] }}</li>
  </ol>

  <h2>B. {{ lang["titleB"] }}</h2>
  <p>{{ lang["creditP1"] }}</p>

  <h2>C. {{ lang["titleC"] }}</h2>
  <p>{{ lang["collectP1"] }}</p>
  <ol>
    <li>{{ lang["collectLi1"] }}</li>
    <li>{{ lang["collectLi2"] }}</li>
    <li>{{ lang["collectLi3"] }}</li>
    <li>{{ lang["collectLi4"] }}</li>
    <li>{{ lang["collectLi5"] }}</li>
    <li>{{ lang["collectLi6"] }}</li>
    <li>{{ lang["collectLi7"] }}</li>
    <li>{{ lang["collectLi8"] }}</li>
    <li>{{ lang["collectLi9"] }}</li>
    <li>{{ lang["collectLi10"] }}</li>
  </ol>

  <h2>D. {{ lang["titleD"] }}</h2>
  <p>{{ lang["useP1"] }}</p>
  <ol>
    <li>{{ lang["useLi1"] }}</li>
    <li>{{ lang["useLi2"] }}</li>
    <li>{{ lang["useLi3"] }}</li>
    <li>{{ lang["useLi4"] }}</li>
    <li>{{ lang["useLi5"] }}</li>
    <li>{{ lang["useLi6"] }}</li>
    <li>{{ lang["useLi7"] }}</li>
    <li>{{ lang["useLi8"] }}</li>
    <li>{{ lang["useLi9"] }}</li>
    <li>{{ lang["useLi10"] }}</li>
    <li>{{ lang["useLi11"] }} </li>
  </ol>
  <p>{{ lang["useP2"] }}</p>
  <p>{{ lang["useP3"] }}</p>
  <h2>E. {{ lang["titleE"] }}</h2>
  <p>{{ lang["divulgeP1"] }}</p>
  <p>{{ lang["divulgeP2"] }}</p>
  <p>{{ lang["divulgeP3"] }}</p>
  <ol>
    <li>{{ lang["divulgeLi1"] }}</li>
    <li>{{ lang["divulgeLi2"] }}</li>
    <li>{{ lang["divulgeLi3"] }}</li>
  </ol>

  <h2>F. {{ lang["titleF"] }}</h2>
  <ol>
    <li>{{ lang["internationalLi1"] }}</li>
    <li>{{ lang["internationalLi2"] }}</li>
    <li>{{ lang["internationalLi3"] }}</li>
  </ol>

  <h2>G. {{ lang["titleG"] }}</h2>
  <ol>
    <li>{{ lang["keepLi1"] }}</li>
    <li>{{ lang["keepLi2"] }}</li>
    <li>{{ lang["keepLi3"] }}</li>
    <li>{{ lang["keepLi4"] }}</li>
  </ol>

  <h2>H. {{ lang["titleH"] }}</h2>
  <ol>
    <li>{{ lang["securityLi1"] }}</li>
    <li>{{ lang["securityLi2"] }}</li>
    <li>{{ lang["securityLi3"] }}</li>
    <li>{{ lang["securityLi4"] }}</li>
    <li>{{ lang["securityLi5"] }}</li>
  </ol>

  <h2>I. {{lang["titleI"]}}</h2>
  <p>{{ lang["amendmentsP1"] }}</p>

  <h2>J. {{ lang["titleJ"] }}</h2>
  <p>{{ lang["rightsP1"] }}</p>
  <p>{{ lang["rightsP2"] }}</p>
  <p>{{ lang["rightsP3"] }}.</p>

  <h2>K. {{ lang["titleK"] }}</h2>
  <p>{{ lang["actualP1"] }}</p>
</main>
  
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
.privacy-page {
  margin: 120px auto 90px;
  width: 80%;
  color: rgb(99, 98, 98);
  text-align: left;

  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: 500;
  }
  
  li {
    margin-bottom: 10px;
  }
}
</style>