<template>
<div class="section">
  <h1>{{lang["thisCookies"]}}</h1>
  <p><strong>{{lang["titleCookies"]}}</strong></p>
<p>{{lang["pCookies"]}}</p>
<ol>
<li>{{lang["li1"]}}
<ol>
<li>{{lang["li2"]}}</li>
</ol>
</li>
<li>{{lang["li3"]}} </li>

<li>{{lang["li4"]}}

</li>
<li>{{lang["li5"]}}</li>
</ol>
</div>
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
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
  padding:20px;
  background-color: #3F3F3F;
  text-align: left;
  color:white;
  border-radius:10px;
  
  
  
}
</style>