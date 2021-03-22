<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <img class="icono" src="">
    <a class="navbar-brand" href="#"><b>ASOCIACIÓN ASPERGER ASTURIAS</b> </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        
               
      </ul>
      
    </div>
  </div>
</nav>
<router-view/>
<footer class="footer bg-dark text-white text-center text-lg-start">  

 
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
    © 2021 Copyfree:
    <a class="text-white" href="https://github.com/Amparcabezas" target="_blank">GitHub</a>
  </div>
  
</footer>
</div>
  
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

.navbar-dark .navbar-nav .nav-link{
  color:white;
  font-size:20px;
}

.icono{
  height: 30px;
  margin-right: 10px;
   
}
.footer{
    
  width: 100%;
  bottom: 0;
  
}
</style>
