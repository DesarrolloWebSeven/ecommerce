<template>
<div class="container section">
  <div class="row">
    <div @click="login" class="col-6 click">
      <h2>Login</h2>
    </div>
    <div @click="register" class="col-6 click">
      <h2>Registro</h2>
    </div>
  </div>
  <div class="row">
    <div v-if="user" class="col">
      <Signin />
    </div>
    <div v-else class="col">
      <Signup />
    </div>
  </div>  
</div>  
</template>

<script>
import Signup from '@/components/Signup.vue'
import Signin from '@/components/Signin.vue'
import { useStore } from 'vuex'
import { ref, reactive, computed } from 'vue'
export default {
  name: "Login",
  components:{
    Signup,
    Signin
  },
  setup(){
    let user = ref(true)
    
    const login = () => user.value = true

    const register = () => user.value = false

    return {
      user,
      register,
      login,
      lang: computed(()=>useStore().getters.getLang)
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  color: gray;
}
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
}
.click {
  cursor: pointer;
}
</style>