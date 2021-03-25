<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer'


export default {
  name: 'Home',
  components: {
    
    Footer
  }
}
</script>
