<template>
<div>

<NavBar />


<router-view/>
<a href="https://wa.me/34692856097/?text=Hola%Geeky!!%¿Podemos%20ayudarte?"><ContactIcon /></a>
<Footer/>

</div>
  
</template>
<script>
import ContactIcon from '@/components/ContactIcon'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'App',
  components: { 
    NavBar,   
    Footer,
    ContactIcon
  },
  setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }
}

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #3F3F3F;
  
  
  
}

</style>
