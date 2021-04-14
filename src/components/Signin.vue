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
import { computed } from 'vue'
import { ref, reactive } from 'vue';
export default {
  name: "Signin",
  setup() {
    let email = ref('')
    let password = ref('')
    let forgotPassword = ref(false)
    let errors = reactive({})
    let success = ref("");
    let regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const login = () => {
      if(forgotPassword.value === true) {
        if(!regExpEmail.test(email.value)) errors.email = "Debes introducir un email válido";
        else {
          fetch("http://localhost:8081/usuario/password", {
            method: "POST",
            body: JSON.stringify({ email: email.value }),
            headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(data => {
              errors.email = ''
              if(data.includes("no encontrado")) success.value = "El usuario no existe"
              else if (data.includes("confirmado")) success.value = "Esta cuenta aún no ha sido confirmada"
              else success.value = "Accede a tu email para cambiar tu contraseña"
            })
            .catch(err => console.log(err))
        }
      } else {
        console.log("hola")
        fetch("http://localhost:8081/usuario/login", {
        method: "POST",
        body: JSON.stringify({
          password: password.value,
          email: email.value
        }),
        headers: { "Content-Type": "application/json" },
        })
        .then(response => {
          if(response.redirected) window.location.href = response.url
        })
        .catch(err => console.info(err + " url: " + url))


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