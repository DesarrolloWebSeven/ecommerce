<template>

  <nav class="navbar navbar-expand-lg navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img class="icono" src="@/assets/geekySmall.png"></a>
    
    <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          
        <li class="nav-item">
          <router-link to="/" class="nav-link">Camisetasssssssssss</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">Accesorios</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Tazas</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Juegos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Destacados</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Idioma</router-link>
        </li>
              
               
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          
        <li class="nav-item">
          <router-link to="/" class="nav-link"><i class="fab fa-accessible-icon"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">Accesorios</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Tazas</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Juegos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Destacados</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Idioma</router-link>
        </li>
              
               
      </ul>
      
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name:'NavBar'

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
  height: 30px;
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


