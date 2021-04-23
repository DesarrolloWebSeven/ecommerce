<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid align-items-start">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column justify-content-center">
          <button
            class="navbar-toggler m-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="d-flex d-xl-none">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <router-link to="/productos/camisetas" class="nav-link">{{
                    lang["tshirts"]
                  }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/productos/accesorios" class="nav-link">{{
                    lang["accessories"]
                  }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/productos/tazas" class="nav-link">{{
                    lang["cups"]
                  }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/productos/games" class="nav-link">{{
                    lang["games"]
                  }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/productos/destacados" class="nav-link">{{
                    lang["featured"]
                  }}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-link to="/" class="nav-link logo"> GEEKY </router-link>
        <div class="d-none d-xl-flex flex-column justify-content-center">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/productos/camisetas" class="nav-link">{{
                  lang["tshirts"]
                }}</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/productos/accesorios" class="nav-link">{{
                  lang["accessories"]
                }}</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/productos/tazas" class="nav-link">{{
                  lang["cups"]
                }}</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/productos/games" class="nav-link">{{
                  lang["games"]
                }}</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/productos/destacados" class="nav-link">{{
                  lang["featured"]
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div d-flex align-items-end>
        <ul
          class="navbar-nav ml-auto mb-2 mb-lg-0 d-flex flex-row align-items-center m-3"
        >
          <li v-if="!user" class="nav-item">
            <router-link to="/login" class="nav-link"
              ><i class="fas fa-user"></i
            ></router-link>
          </li>
          <li v-if="user" class="nav-item d-flex align-items-center" >
            <router-link to="/perfil" class="nav-link d-flex align-items-center"
              ><i class="fas fa-user"></i
            ></router-link>
            <div @click="logout" class="nav-link">Logout</div>
          </li>

          <li class="nav-item">
            <router-link to="/carrito" class="nav-link"
              ><i class="fas fa-shopping-cart cart"></i
            ><span id="cart_menu_num" data-action="cart-can" class="badge rounded-circle total">{{totalQuantity}}</span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/buscador" class="nav-link"
              ><i class="fas fa-search"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <Lang class="" />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { computed } from "vue";
import Lang from "@/components/Lang";

export default {
  name: "NavBar",
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = computed(() => {
      return store.getters.getToken;
    });

    const logout = () => {
      localStorage.removeItem('jwt')
      store.dispatch('setLogin', null)
      router.push('/')
    }
    const totalQuantity = computed(() => store.getters.totalQuantity)

    return {
      user,
      logout,
      totalQuantity,
      lang: computed(() => useStore().getters.getLang),
    };
  },

  components: {
    Lang,
    
  },
};
</script>

<style lang="scss" scoped>
.navbar-dark .navbar-nav .nav-link {
  color: white;
  font-size: 20px;
}
nav.navbar {
  background-color: #0f606b;
  
}
.nav-link {
  font-family: "Game";
  color: black;
  margin-left: 10px;
}

.nav-item div {
  cursor: pointer;
}

.logo {
  margin-right: 10px;
  font-size: 40px;
}

.cart {
  position: relative;
}

#cart_menu_num {
  position: absolute;  
  background: red;
  height: 20px;     
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2px;
  
}
.total{
  font-size: 10px;
}

.bi::before {
  display: inline-block;
  content: "";
  vertical-align: -0.125em;
  background-image: url("data:image/svg+xml,<svg viewBox='0 0 16 16' fill='%23333' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' clip-rule='evenodd'/></svg>");
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
}
</style>>


