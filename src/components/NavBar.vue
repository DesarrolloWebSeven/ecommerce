<template>

  <nav class="navbar navbar-expand-lg navbar-dark">
  <div class="container-fluid">
    
        <div class="d-flex justify-content-between">
        <router-link to="/" class="nav-link"><img class="icono" src="@/assets/geekySmall.png"></router-link>

    
    <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>


    
    </div>
    
     <div d-flex align-items-end>
      <ul class="navbar-nav ml-auto mb-2 mb-lg-0 d-flex flex-row">
        
        <li class="nav-item">
          <router-link to="/login" class="nav-link"><i class="fas fa-user"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/idioma" class="nav-link"><i class="fas fa-language"></i></router-link>
        </li> 
        <li class="nav-item">
          <router-link to="/carrito" class="nav-link"><i class="fas fa-shopping-cart"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/buscador" class="nav-link"><i class="fas fa-search"></i></router-link>
        </li>
     </ul>  
  

        </div>   
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          
        <li class="nav-item">
          <router-link to="/productos/camisetas" class="nav-link">{{lang["tshirts"]}}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/productos/accesorios" class="nav-link">{{lang["accessories"]}}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/productos/tazas" class="nav-link">{{lang["cups"]}}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/productos/juegos" class="nav-link">{{lang["games"]}}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/productos/destacados" class="nav-link">{{lang["featured"]}}</router-link>
        </li>
        
              
               
      </ul>
      <Lang />
      
      
    </div>
    
    
    
  </div>
  
  
</nav>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Lang from '@/components/Lang'

export default {
    name:'NavBar',
  setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  },

    components:{
      Lang
    }

}
</script>

<style lang="scss" scoped>
.navbar-dark .navbar-nav .nav-link{
  color:white;
  font-size:20px;
}
nav.navbar {
    background-color:#0F606B;
}

.icono{
  height: 45px;
  margin-right: 10px;
   
}
.bi::before {
  display: inline-block;
  content: "";
  vertical-align: -.125em;
  background-image: url("data:image/svg+xml,<svg viewBox='0 0 16 16' fill='%23333' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' clip-rule='evenodd'/></svg>");
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
}
</style>>


