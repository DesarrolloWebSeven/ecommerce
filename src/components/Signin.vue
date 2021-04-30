<template>
  <form class="login-form" @submit.prevent="login">
    <label>{{lang["emailLogin"]}}</label>
    <input type="text" v-model="email" :placeholder="lang['plEmailLogin']" />
    <p v-if="errors.email">{{ errors.email }}</p>
    <label>{{lang["passLogin"]}}</label>
    <input type="password" v-model="password" :placeholder="lang['plPasslLogin']" />
    <p v-if="errors.password">{{ errors.password }}</p>
    <label><input type="checkbox" v-model="forgotPassword"/> {{lang["forgotPassLogin"]}}</label>
    <div v-if="errors" class="alert alert-danger" role="alert">{{ errors }}</div>
    <p v-if="success">{{ success }}</p>
    <button>{{lang["buttonLogin"]}}</button>
  </form>
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
        
        if(!regExpEmail.test(email.value)) errors.value = "Debes introducir un email válido";
        else {

          try {
          const res = await axios.post("usuario/password", { email: email.value })
          errors.value = ''
          if(res.data == 'Usuario no encontrado') success.value = "El usuario no existe"
          else if (res.data == 'Usuario no confirmado') success.value = "Esta cuenta aún no ha sido confirmada"
          else success.value = "Accede a tu email para cambiar tu contraseña"
          } catch (err) {
            console.log(err.message)
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
          console.log(err.message)
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