<template>
  <footer class="footer">
    <div class="footer-links">
      <router-link to="/contacto" class="links">{{lang["contact"]}}</router-link>           
      <router-link to="/equipo" class="links">{{lang["team"]}}</router-link>
      <router-link to="/proyecto" class="links">{{lang["proyect"]}}</router-link>
      <router-link to="/" class="links-img"><img src="/logo/name-bn.png" alt="Logotipo Geeky"/></router-link>      
      <router-link to="/politicaprivacidad" class="links">{{lang["privacyPolicy"]}}</router-link>
      <router-link to="/cookies" class="links">{{lang["cookies"]}}</router-link>  
      <a class="links-logo" href="https://github.com/DesarrolloWebSeven/ecommerce"  target="_blank">GitHub</a>
    </div>
    <div class="footer-rights">
      <p>
        Copyfree &copy; 2021 {{lang["footerRights"]}} <router-link class="rights-link" to="/">Geeky</router-link>
      </p>
    </div>
  </footer>
</template>

<script>
import { useStore } from 'vuex'
import { ref, reactive, computed } from "vue"; 
export default {
  name: "Footer",
  props: {},
  setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }
  
};
</script>

<style lang="scss" scoped>

.footer {
  width: 100%;
  padding: 5px 0;
  background-color: #000;
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;

    .links, .links-img, .links-logo {
      font-weight: 500;
      font-size: 0.9rem;
      width: 13%;
      text-align: center;
      text-decoration: none;
      color: white;

      img {
      max-width: 50%;
      }

    }

    .links:hover {
      color: gray;
    }

  }

  .footer-rights {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: 0.5rem;
      color:rgb(190, 190, 190);
      margin: 0;
    }

    .rights-link {
      text-decoration: none;
      color:rgb(190, 190, 190);
      cursor: pointer;
    }
  }

  @media (max-width: 1050px) {
  
  .footer-links {
    flex-direction: column;
    justify-content: center;
    align-items: stretch;

    .links, .links-img, .links-logo {
      width: 100%;

      img {
      max-width: 15%;
      }

    }

    .links {
      order: 2
    }

    .links.img {
      order: 1;
    }
  }

}
}

</style>