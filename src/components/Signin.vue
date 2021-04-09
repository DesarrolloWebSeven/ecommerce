<template>
  <div class="container section">
    <form class="section row g-3">
      <div class="col-12">
        <label class="form-label">Correo</label>
        <input type="text" v-model="email" class="form-control" placeholder="Introduce tu correo" />
      </div>
      <div class="col-12" v-if="errors.email">
        <p>{{ errors.email }}</p>
      </div>
      <div class="col-12">
        <label class="form-label">Contraseña</label>
        <input type="password" v-model="password" class="form-control" placeholder="Introduce tu contraseña" />
      </div>
      <div class="col-12" v-if="errors.password">
        <p>{{ errors.password }}</p>
      </div>
      <label><input type="checkbox" v-model="forgotPassword"/>
      ¿Has olvidado tu contraseña?</label>
      <div class="col-12" v-if="success">
        <p>{{ success }}</p>
      </div>
      <div class="col-12">
        <div class="btn btn-primary" @click="login">Iniciar sesión</div>
      </div>
    </form>
  </div>
</template>

<script>
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
              else success.value = "Accede a tu email para cambiar tu contraseña"
            })
            .catch(err => console.log(err.message))
        }
      } else {
        fetch("http://localhost:8081/usuario/login", {
        method: "POST",
        body: JSON.stringify({
        password: password.value,
        email: email.value,
        forgotpassword: forgotPassword.value
        }),
        headers: { "Content-Type": "application/json" },
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err.message))
      }
      
    }

    return {
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
}
</style>