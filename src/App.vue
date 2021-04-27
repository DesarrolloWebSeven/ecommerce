<template>
<NavBar />

<router-view />
<div class="contact">
  <a href="#top-page"><i class="far fa-arrow-alt-circle-up"></i></a>
  <a href="https://wa.me/34692856097/?text=Hola%Geeky!!%¿Podemos%20ayudarte?"><i class="fab fa-whatsapp fa-3x"></i></a>
</div>
<AlertCookies />
<Footer/>  
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

#app {  
  
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: white;

  a {
    text-decoration: none;
  }

  h1, h2 {
    font-family: 'Montserrat', sans-serif;
  }

  @media (max-width: 1050px) {

    .contact {
      height: 0;
      width: 100%;
      padding: 0 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      bottom: 200px;
      left: 0;

      i {
        font-size: 2rem;
        color: #0f606b;
      }
      
      i:hover{
        color: #707070;
      } 
    }
  }

  @media (min-width: 1050px){

    .contact {
      height: 0;
      width: 100%;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      bottom: 90px;

      i {
        font-size: 3rem;
        color: #0f606b;
      }

      i:hover{
        color: #707070;
      } 
      
    }
  }
}
</style>
