<template>
<header>
  <nav class="header">
    <div id="button" @click="type = false"><i class="fas fa-bars"></i></div>
    <router-link to="/" class="logo"><img src="/logo/logo-color.png" alt="Logotipo Geeky"></router-link>
    <ul class="menu">
      <li><router-link to="/productos/camisetas" class="links">{{lang["tshirts"]}}</router-link></li>
      <li><router-link to="/productos/accesorios" class="links">{{lang["accessories"]}}</router-link></li>
      <li><router-link to="/productos/tazas" class="links">{{lang["cups"]}}</router-link></li>
      <li><router-link to="/productos/juegos" class="links">{{lang["games"]}}</router-link></li>
    </ul>
    <ul class="menu-icons">
      <li>
        <router-link to="/carrito" class="cart"><i class="fas fa-shopping-cart cart"></i>
        <span id="cart_menu_num" data-action="cart-can"><p>{{totalQuantity}}</p></span>
        </router-link>
      </li>
      <li v-if="!user">
        <router-link to="/login" class="item"><i class="fas fa-user"></i></router-link>
      </li>
      <li v-if="user" >
        <router-link to="/perfil" class="item"><i class="fas fa-user"></i></router-link>
      </li>
      <li v-if="user" >
        <i @click="logout" class="fas fa-user-slash"></i>
      </li>
      <li v-if="!{ name : 'Home' }">
        <router-link to="/buscador" class="item"><i class="fas fa-search"></i></router-link>
      </li>
      <li class="item">
        <Lang class="" />
      </li>
    </ul>
</nav>
</header>
<nav id="menu-hamburger" :class="{ show: type }">
  <ul class="menu2" @click="type = true" @mouseleave="type = true">
      <li><router-link to="/productos/camisetas" class="links">{{lang["tshirts"]}}</router-link></li>
      <li><router-link to="/productos/accesorios" class="links">{{lang["accessories"]}}</router-link></li>
      <li><router-link to="/productos/tazas" class="links">{{lang["cups"]}}</router-link></li>
      <li><router-link to="/productos/juegos" class="links">{{lang["games"]}}</router-link></li>
    </ul>
</nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { computed, ref } from "vue"
import Lang from "@/components/Lang";

export default {
  name: "NavBar",
  setup() {
    const store = useStore()
    const router = useRouter()
    const type = ref(true)
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
      type,
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
header {
  width: 100%;
  background-color: #fff;
  box-shadow: 3px 3px 3px rgb(248, 246, 246);
  position: fixed;
  top: 0;
  z-index: 10;
}

.header {
  width: 80%;
  margin: 0 auto;
  padding: 25px 0;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #button {
    display: none;
  }

  .logo {
    margin: 0;
    padding: 0;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
    }
  }
}

.header .menu {
  margin: 0;
  padding: 0;
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;

  li {
  padding: 0 20px;
  text-decoration: none;

    .links {
      font-family: 'Montserrat', sans-serif;
      color: gray;
      font-weight: 500;
      letter-spacing: 2px;
    }

    .links:hover {
      color: black;
    }
  }
}

.header .menu-icons {
  margin: 0;
  padding: 0;
  width: 15%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;

  li {
    padding: 0 5px;
  }

  .cart {
    position: relative;
  }

  #cart_menu_num {
    position: absolute;
    bottom: -30%;
    left: -30%;
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    border-radius: 50%;
    color: white;
    background-color: #ff5e52;
    line-height: 20px;
  }

  i {
    color: #616161;
    font-size: 1.3rem;
  }
}

.header .button:hover {
  background-color: #f4f4f4;
}

.show {
  display: none;
}

#menu-hamburger {
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 5;
  width: 100%;
  background-color: rgb(216, 213, 213);

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    li {
      padding: 10px 0;

      .links {
        color: #fff
      }

      .links:hover {
        color: gray;
      }
    }
  }
}

@media (max-width: 1000px) {

  .header {
    #button {
      display: block;
      margin: 0;
      padding: 0;
      text-align: left;
      width: 5%;
      cursor: pointer;

      i {
        color: #616161;
      }
    }

    .logo {
      width: 55%;

      img {
        margin-left: 5px;
        margin-right: auto;
        width: 40%;
      }
    }

    .menu {
      display: none;
    }

    .menu-icons {
      width: 40%;

      li {
        padding: 0 2px;
      }

      i {
        font-size: 1.2rem;
      }
    }
  }
  
}

</style>


