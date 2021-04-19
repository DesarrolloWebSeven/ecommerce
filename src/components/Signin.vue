<template>
  <div class="container section">
    <form class="section row g-3" @submit.prevent="login">
      <div class="col-12">
        <label class="form-label">{{lang["emailLogin"]}}</label>
        <input type="text" v-model="email" class="form-control" :placeholder="lang['plEmailLogin']" />
      </div>
      <div class="col-12" v-if="errors.email">
        <p>{{ errors.email }}</p>
      </div>
      <div class="col-12">
        <label class="form-label">{{lang["passLogin"]}}</label>
        <input type="password" v-model="password" class="form-control" :placeholder="lang['plPasslLogin']" />
      </div>
      <div class="col-12" v-if="errors.password">
        <p>{{ errors.password }}</p>
      </div>
      <label><input type="checkbox" v-model="forgotPassword"/>
      {{lang["forgotPassLogin"]}}</label>
      <div v-if="errors" class="password error">{{ errors }}</div>
      <div class="col-12" v-if="success">
        <p>{{ success }}</p>
      </div>
      <div class="col-12">
        <button class="btn btn-primary">{{lang["buttonLogin"]}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, computed } from 'vue'
export default {
  name: "Signin",
  setup() {
    const store = useStore()
    const router = useRouter()
    let email = ref('')
    let password = ref('')
    let errors = ref('');
    let success = ref('');
    let forgotPassword = ref(false)
    let regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const login = async () => {
      if(forgotPassword.value === true) {
        
        if(!regExpEmail.test(email.value)) errors.email = "Debes introducir un email válido";
        else {

          try {
          const res = await axios.post("http://localhost:8081/usuario/password", {
            method: "POST",
            body: JSON.stringify({ email: email.value }),
            headers: { "Content-Type": "application/json" }
          })
          const data = await res.json()
          errors.email = ''
          if(data.includes("no encontrado")) success.value = "El usuario no existe"
          else if (data.includes("confirmado")) success.value = "Esta cuenta aún no ha sido confirmada"
          else success.value = "Accede a tu email para cambiar tu contraseña"
          } catch (err) {
            console.log(err)
          }
      }}

      if(forgotPassword.value === false) {
        
        try {

          const res = await axios.post("usuario/login", {
          password: password.value,
          email: email.value
          })
          if(typeof res.data == 'string') errors.value = res.data
          else {
            store.dispatch('setLogin', res.data.token)
            localStorage.setItem('jwt', res.data.token)
            router.push('/')
          }
        } catch (err) {
        console.log(err)
        }
      }
      
    }

    return {
      lang: computed(()=>useStore().getters.getLang),
      email,
      password,
      forgotPassword,
      errors,
      success,
      login
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  max-width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  color: black;
}
</style>