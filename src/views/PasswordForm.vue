<template>
  <main class="password-page">
    <h1>Cambiar contraseña</h1>
    <form class="password-form" @submit.prevent="changePassword">
      <label>Correo electrónico</label>
      <input id="email" type="text" v-model="email" readonly/>
      <label>Contraseña</label>
      <input type="password" v-model="password" placeholder="Introduce tu contraseña" />
      <p class="alert alert-danger" role="alert" v-if="errors.password">{{ errors.password }}</p>
      <label>Repite la contraseña</label>
      <input type="password" v-model="repeatPassword" placeholder="Introduce de nuevo tu contraseña" />
      <p class="alert alert-danger" role="alert" v-if="errors.repeatpassword">{{ errors.repeatpassword }}</p>
      <p v-if="success" class="alert alert-success" role="alert">{{ success }}</p>
      <button type="submit">Cambiar contraseña</button>
    </form> 
  </main>
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
.password-page {
  width: 80%;
  max-width: 700px;
  margin: 130px auto;
}

h1 {
    color: black;
    text-align: center;
    margin-bottom: 10px;
}

.password-form {
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 239, 239);
  border-radius: 10px;
  color: black;

  label, input {
    text-align: left;
    margin-bottom: 10px;
  }

  input {
    padding: 5px 10px;
    border: none;
    border-bottom: 1px solid rgb(189, 189, 189);
    background-color: rgba(255, 254, 254, 0.692);
  }

  #email {
    color: #22B573;
  }
}

button {
  width: 50%;
  align-self: center;
  border: none;
  border-radius: 5px;
  padding: 5px 0;
  color: white;
  background-color: #22B573;
  margin-top: 10px;
}

button:hover {
  opacity: 60%;
}

button:focus {
  outline: none;
}

@media (max-width: 700px) {
  .password-form {
    padding: 30px 15px;

    button {
      width: 80%;
    }
  }
}

</style>