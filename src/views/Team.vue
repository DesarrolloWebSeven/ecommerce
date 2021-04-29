<template>
  <div class="team-page">
    <h1>Equipo</h1>
    <div class="container">
      <div class="row profile_cards d-flex justify-content-between">
        <div class="col-12 col-md-6 col-lg-3" >
          <div class="card">
          <img src="@/assets/ampa.jpeg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Amparo Cabezas</h5>
            <p class="card-text">
              {{ lang["descriptionAmparo"] }}
            </p>
            <a
              href="https://www.linkedin.com/in/amparocabezas-desarrolladora-web-frontend/"
              target="_blank"
              class="btn btn-primary"
              ><i class="fab fa-linkedin"></i
            ></a>
            <a href="https://github.com/Amparcabezas" class="btn btn-primary"
              ><i class="fab fa-github-square"></i
            ></a>
          </div>
          </div>
        </div>
        <div class="col-3" >
          <div class="card">
          <img src="@/assets/victor.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Víctor Bonilla</h5>
            <p class="card-text">
              {{ lang["descriptionVictor"] }}
            </p>
            <a
              href="https://github.com/DesarrolloWebSeven"
              class="btn btn-primary"
              ><i class="fab fa-linkedin"></i
            ></a>
            <a
              href="https://www.linkedin.com/in/victor-bonilla-423884119/"
              class="btn btn-primary"
              ><i class="fab fa-github-square"></i
            ></a>
          </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card">
          <img src="@/assets/nuria.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Nuria Martínez</h5>
            <p class="card-text">
              {{ lang["descriptionNuria"] }}
            </p>
            <a
              href="https://www.linkedin.com/in/nuriamartinezrodrigo/"
              class="btn btn-primary"
              ><i class="fab fa-linkedin"></i
            ></a>
            <a href="https://github.com/nurimartinez" class="btn btn-primary"
              ><i class="fab fa-github-square"></i
            ></a>
          </div>
          </div>
        </div>
        <div class="col-3" >
          <div class="card">
          <img src="@/assets/bea.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Beatriz López</h5>
            <p class="card-text">
              {{ lang["descriptionBeatriz"] }}
            </p>
            <a
              href="https://www.linkedin.com/in/beatriz-lopez-martin/"
              class="btn btn-primary"
              ><i class="fab fa-linkedin"></i
            ></a>
            <a href="https://github.com/belopmardev" class="btn btn-primary"
              ><i class="fab fa-github-square"></i
            ></a>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "Team",
  setup() {
    return {
      lang: computed(() => useStore().getters.getLang),
    };
  },
};
</script>


<style lang="scss" scoped>
.team-page {
  margin: 100px auto;
  width: 80%;
  color: rgb(99, 98, 98);

  h1 {
    color: black;
    margin-bottom: 40px
  }
}
.container {
  width: 100%;
  margin: 0;
  padding: 0;
}

.card {  
  padding: 10px;
  margin: 3px;

  .card-text{
    min-height: 190px;
    font-size: 0.9rem;
  } 
  
}

img{
  border-radius: 50%;
}

  a {
    border: none;
    justify-content: center;
    margin: 10px;
    background-color: #0f606b;
  }

  a:hover {
    background-color: #707070;
  }

</style>
