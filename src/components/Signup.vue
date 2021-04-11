<template>
  <div class="container section">
    <form class="section row g-3">
      <div class="col-12">
        <label class="form-label">Correo</label>
        <input type="text" v-model="email" class="form-control" placeholder="Introduce tu correo"
        />
      </div>
      <div class="col-12" v-if="errors.email">
        <p>{{ errors.email }}</p>
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
        <input type="password" v-model="repeat_password" class="form-control" placeholder="Introduce de nuevo tu contraseña"
        />
      </div>
      <div class="col-12" v-if="errors.repeatpassword">
        <p>{{ errors.repeatpassword }}</p>
      </div>
      <div class="col-12" v-if="success">
        <p>{{ success }}</p>
      </div>
      <div class="col-12">
        <div @click="register" class="btn btn-primary">Guarda tus datos</div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "Signup",
  setup() {
    let email = ref("");
    let password = ref("");
    let repeat_password = ref("");
    let errors = reactive({});
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
            errors.email = "";
            errors.password = "";
            errors.repeatpassword = "";
            if (response._id) {
              success.value =
                "Usuario creado con éxito. Revisa tu email para activar tu cuenta.";
            } else if (response.code === 11000)
              errors.email = "El email ya existe";
            else if (response.message.includes("user validation failed")) {
              if (response.errors.email)
                errors.email = response.errors.email.message;
              if (response.errors.password)
                errors.password = response.errors.password.message;
            }
          })
          .catch((err) => console.log(err.message));
      }
    };

    return {
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