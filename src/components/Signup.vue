<template>
  <form class="login-form" @submit.prevent="register">
    <label>{{ lang['emailSign'] }}</label>
    <input type="text" v-model="email" :placeholder="lang['plPasslLogin']" />
    <p class="alert alert-danger" role="alert" v-if="errors.email">{{ errors.email }}</p>
    <label >{{ lang['passSign'] }}</label>
    <input type="password" v-model="password" :placeholder="lang['plPassSign']" />
    <p class="alert alert-danger" role="alert" v-if="errors.password">{{ errors.password }}</p>
    <label >{{ lang['repeatPassSign'] }}</label>
    <input type="password" v-model="repeat_password" :placeholder="lang['plrRepeatPassSign']" />
    <p class="alert alert-danger" role="alert" v-if="errors.repeatpassword">{{ errors.repeatpassword }}</p>
    <p class="alert alert-success" role="alert" v-if="success">{{ success }}</p>
    <button>{{ lang['buttonSave'] }}</button>
  </form>
</template>

<script>
import axios from 'axios'
import { useStore } from "vuex";
import { computed, ref } from "vue"
export default {
  name: "Signup",
  setup() {
    let email = ref("");
    let password = ref("");
    let repeat_password = ref("");
    let errors = ref({});
    let success = ref("");
    let regExpEmail = /^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    const register = async () => {
      errors.value = {}
      if (!regExpEmail.test(email.value))
        errors.value.email = "Debes introducir un email válido";
      if (!regExpPassword.test(password.value))
        errors.value.password = "El password debe tener mayúscula, número y símbolo";
      if (password.value !== repeat_password.value)
        errors.value.repeatpassword = "No coincide con el password";
      if (
        regExpEmail.test(email.value) &&
        regExpPassword.test(password.value) &&
        password.value === repeat_password.value
      ) {
        try {
          const res = await axios.post("usuario/registro", {
            password: password.value,
            email: email.value
          })
          errors.value = ""
          if (res.data.user) success.value = "Usuario registrado. Revisa tu email para activar tu cuenta.";
          else {
            errors.value = res.data
            password.value = ""
            repeat_password.value = ""
          }
        } catch (err) {
          console.log(err.message)
        }
      }       
    }

    return {
      lang: computed(() => useStore().getters.getLang),
      email,
      password,
      repeat_password,
      errors,
      success,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  max-width: 80%;
  margin: 10px auto;
  color: black;
  display: flex;
  flex-direction: column;

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
}

button {
  width: 50%;
  align-self: center;
  border: none;
  border-radius: 5px;
  padding: 5px 0;
  color: white;
  background-color: #22B573;
}

button:hover {
  opacity: 60%;
}

button:focus {
  outline: none;
}
</style>
