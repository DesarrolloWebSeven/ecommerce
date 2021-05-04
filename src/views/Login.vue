<template>
  <main class="main-content">
    <section class="login-page">
      <div class="login-options">
        <div @click="login" class="signin" :class="{ activein : activein }">
          <h2>Login</h2>
        </div>
        <div @click="register" class="signup" :class="{ activeup: activeup }">
          <h2>Sign In</h2>
        </div>
      </div>
      <div class="login-data">
        <div v-if="user" class="data-sigin">
          <Signin />
        </div>
        <div v-else class="data-signup">
          <Signup />
        </div>
      </div>  
    </section>
  </main>  
</template>

<script>
import Signup from '@/components/Signup.vue'
import Signin from '@/components/Signin.vue'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
export default {
  name: "Login",
  components:{
    Signup,
    Signin
  },
  setup(){
    let user = ref(true)
    let activein = ref(true)
    let activeup = ref(false)
    
    const login = () => {
      user.value = true
      activein.value = true
      activeup.value = false
    }

    const register = () => {
      user.value = false
      activein.value = false
      activeup.value = true
    }

    return {
      user,
      activein,
      activeup,
      register,
      login,
      lang: computed(()=>useStore().getters.getLang)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-page {
  width: 80%;
  margin: 145px auto;
  color: black;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0;
    padding: 0;
  }
}

.login-options {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .signin, .signup {
    width: 50%;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    border: 1px solid rgb(189, 189, 189);
    border-bottom: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(104, 103, 103);
  }
}

.login-data {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 0 0 10px 10px;
  background-color: rgb(240, 239, 239);
  border: 1px solid rgb(189, 189, 189);
  border-top: none;
  box-shadow: 3px 3px 10px rgb(197, 197, 197);

  >div {
    width: 100%;
  }
}

.click {
  cursor: pointer;
}

.activein, .activeup {
  background-color: rgb(240, 239, 239);
  color: black;
}
</style>