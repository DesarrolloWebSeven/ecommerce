<template>
  <div class="container section">
    <form class="section row g-3" @submit.prevent="register">
      <div class="col-12">
        <label class="form-label">{{lang["emailSign"]}}</label>
        <input type="text" v-model="email" class="form-control" :placeholder="lang['plPasslLogin']"
        />
      </div>
      <div class="col-12" v-if="errors.email">
        <p>{{ errors.email }}</p>
      </div>
      <div class="col-12">
        <label class="form-label">{{lang["passSign"]}}</label>
        <input type="password" v-model="password" class="form-control" :placeholder="lang['plPassSign']"
        />
      </div>
      <div class="col-12" v-if="errors.password">
        <p>{{ errors.password }}</p>
      </div>
      <div class="col-12">
        <label class="form-label">{{lang["repeatPassSign"]}}</label>
        <input type="password" v-model="repeat_password" class="form-control" :placeholder="lang['plrRepeatPassSign']"
        />
      </div>
      <div class="col-12" v-if="errors.repeatpassword">
        <p>{{ errors.repeatpassword }}</p>
      </div>
      <div class="col-12" v-if="success">
        <p>{{ success }}</p>
      </div>
      <div class="col-12">
        <button class="btn btn-primary">{{lang["buttonSave"]}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ref } from "vue";
export default {
  name: "Signup",
  setup() {
    let email = ref("");
    let password = ref("");
    let repeat_password = ref("");
    let errors = ref({});
    let success = ref("");
    let regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    const register = () => {
      if (!regExpEmail.test(email.value))
        errors.email = "Debes introducir un email válido";
      if (!regExpPassword.test(password.value))
        errors.password = "Debes introducir un password válido";
      if (password.value !== repeat_password.value)
        errors.repeatpassword = "No coincide con el password";
      if (
        regExpEmail.test(email.value) &&
        regExpPassword.test(password.value) &&
        password.value === repeat_password.value
      ) {
        fetch("http://localhost:8081/usuario/registro", {
          method: "POST",
          body: JSON.stringify({
            password: password.value,
            email: email.value,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((response) => { 
            errors.value = "";
            if (response.user) success.value = "Usuario registrado. Revisa tu email para activar tu cuenta.";
            else errors.value = response
          })
          .catch((err) => console.log(err.message));
      }
    };

    return {
      lang: computed(()=>useStore().getters.getLang),
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
.section {
  max-width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>