<template>
<div class="container section"> 
  <form class="section row g-3">
      <div class="col-12">
        <label class="form-label">Correo electrónico</label>
        <input type="text" v-model="email" class="form-control" placeholder="Introduce tu correo electrónico" readonly/>
      </div>
      <div class="col-12">
        <label class="form-label">Contraseña</label>
        <input type="password" v-model="password" class="form-control" placeholder="Introduce tu contraseña"
        />
      </div>
      <div class="col-12" v-if="errors.password">
        <p>{{ errors.password }}</p>
      </div>
      <div class="col-12">
        <label class="form-label">Repite la contraseña</label>
        <input type="password" v-model="repeatPassword" class="form-control" placeholder="Introduce de nuevo tu contraseña"
        />
      </div>
      <div class="col-12" v-if="errors.repeatpassword">
        <p>{{ errors.repeatpassword }}</p>
      </div>
      <div class="col-12" v-if="success">
        <p>{{ success }}</p>
      </div>
      <div class="col-12">
        <div @click="changePassword" class="btn btn-primary">Cambiar contraseña</div>
      </div>
    </form>
</div>
  
</template>

<script>
import { ref, reactive, onBeforeMount } from 'vue'
export default {
  name: "PasswordForm",
  props: {
    id: String
  },
  setup(props){
    let email = ref('')
    let password = ref("");
    let repeatPassword = ref("");
    let errors = reactive({});
    let success = ref("");
    let regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    onBeforeMount( () => {
      fetch(`http://localhost:8081/usuario/password/${props.id}`)
          .then(res => res.json())
          .then(response => email.value = response[0].email)
          .catch(err => console.log(err.message))
    })

    const changePassword = () => {
      errors.password = ''
      errors.repeatpassword = ''
      if(!regExpPassword.test(password.value)) errors.password = "Debes introducir un password válido";
      if (password.value !== repeatPassword.value) errors.repeatpassword = "No coincide con el password";
      if (regExpPassword.test(password.value) && password.value === repeatPassword.value) {
        fetch(`http://localhost:8081/usuario/password/${props.id}`, {
          method: "PUT",
          body: JSON.stringify({ password: password.value }),
          headers: { "Content-Type": "application/json" },
        })
          .then(res => res.json())
          .then(data => success.value = "Tu contraseña ha sido cambiada correctamente.")
          .catch(err => console.log(err.message))
      }
    }
    return { 
      email,
      password,
      repeatPassword,
      errors,
      success,
      changePassword
    }
}
}

</script>

<style lang="scss" scoped>
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
}

</style>