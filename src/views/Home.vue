<template>
  <main class="main-content">
    <section class="home">
      <div class="home-banner">
        <img :src="lang.imgBanner" alt="">
      </div>
      <div class="home-section">
        <div class="links">
          <router-link to="/productos/camisetas"><img :src="lang.imgTshirts" alt=""></router-link>
        </div>
        <div class="links">
          <router-link to="/productos/tazas"><img :src="lang.imgMugs" alt=""></router-link>
        </div>
        <div class="links">
          <router-link to="/productos/juegos"><img :src="lang.imgGames" alt=""></router-link>
        </div>
        <div class="links">
          <router-link to="/productos/accesorios"><img :src="lang.imgAccessories" alt=""></router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: "Home",
  setup() {
    return {
      lang: computed(() => useStore().getters.getLang),
    };
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home {
  margin: 80px auto 50px;
  width: 80%;
  
  .home-banner img {
    max-width: 100%;
  }

  .home-section {
    margin: 30px 0;
    width: 100%;

    .links {

      img {
        width: 100%;
        max-width: 100%;
      }

      img:hover {
        filter: opacity(60%);
      }
    }
  
  }
    

  @media (max-width: 1050px) {

  .home-section {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 1fr);
    grid-row-gap: 10px;
  }

  }

  @media (min-width: 1050px) {

  .home-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 15px;

  }
  }
}

</style>
