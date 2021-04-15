<template>
<div class="container section">
<h1>Este es nuestro equipo</h1>
<div class="profile_cards d-flex justify-content-center">
<div class="card m-3" style="width: 18rem;">
  <img src="@/assets/ampa.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Ampa</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary"><i class="fab fa-linkedin"></i></a>
    <a href="#" class="btn btn-primary"><i class="fab fa-github-square"></i></a>
  </div>
</div>
<div class="card m-3" style="width: 18rem;">
  <img src="@/assets/ampa.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Ampa</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary"><i class="fab fa-linkedin"></i></a>
    <a href="#" class="btn btn-primary"><i class="fab fa-github-square"></i></a>
  </div>
</div>
<div class="card m-3" style="width: 18rem;">
  <img src="@/assets/ampa.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Ampa</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary"><i class="fab fa-linkedin"></i></a>
    <a href="#" class="btn btn-primary"><i class="fab fa-github-square"></i></a>
  </div>
</div>
<div class="card m-3" style="width: 18rem;">
  <img src="@/assets/ampa.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Ampa</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary"><i class="fab fa-linkedin"></i></a>
    <a href="#" class="btn btn-primary"><i class="fab fa-github-square"></i></a>
  </div>
</div>
</div>

</div>
<label>{{lang["lang-label"]}}</label>


  
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name:'Team',
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
  background-color: #707070;
  text-align: center;
  color:#fff;
  border-radius:25px;  

    .card, img{
      border-radius:25px; 
      background-color: #707070; 
    }
  
}


</style>
