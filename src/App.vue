<template>
<div>
<NavBar />

<router-view/>
<div class="d-flex justify-content-end">
  <a href="https://wa.me/34692856097/?text=Hola%Geeky!!%¿Podemos%20ayudarte?"><i class="fab fa-whatsapp fa-3x"></i></a>
</div>
<AlertCookies />
<Footer/>

</div>
  
</template>
<script>

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import AlertCookies from '@/components/AlertCookies'

import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'App',
  components: { 
    NavBar,   
    Footer,
    AlertCookies
  },
  setup(){
    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }
}

</script>


<style lang="scss">
@import "./assets/fonts/fonts.css";


#app {  
  
  font-family: "Montserrat", "Game", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: white;
  a{
    text-decoration: none;
  }
  h1{
    font-family: "Montserrat";
    color: black
  }
  .fa-whatsapp{
    margin: 10px;
    color: #0f606b;
  }
  .fa-whatsapp:hover{
    color: #707070;
  }
  
  
  
  
}

</style>
