<template>
<div class="container section">
<TabsWrapper>
    <Tab  class="login" title="LOGIN">
        <h3>Bienvenidx</h3>
        <form class="section row g-3">
      <div class="col-12">
        <label class="form-label">Correo</label>
        <input
          type="text"
          name="email"
          id="email"
          class="form-control"
          placeholder="Introduce tu correo"
        />
      </div>
      <div class="col-12">
        <label class="form-label">Contraseña</label>
        <input
          type="text"
          name="password"
          id="password"
          class="form-control"
          placeholder="Introduce tu contraseña"
        />
      </div>
      <label><input type="checkbox" id="forgot_password" value="forgot_password">¿Has olvidado tu contraseña?</label>
      <div class="col-12">
        <button class="btn btn-primary">Iniciar sesión</button>
      </div>
        </form>
    </Tab>
    <Tab title="REGISTRO">
        <h3>Únete a nosotrxs</h3>
        <form class="section row g-3">
      <div class="col-12">
        <label class="form-label">Correo</label>
        <input
          type="text"
          v-model="email"
          class="form-control"
          placeholder="Introduce tu correo"
        />
      </div>
      <div class="col-12" v-if="errors.email">
        <p>{{ errors.email }}</p>
      </div>
      <div class="col-12">
        <label class="form-label">Contraseña</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Introduce tu contraseña"
        />
      </div>
      <div class="col-12" v-if="errors.password">
        <p>{{ errors.password }}</p>
      </div>
      <div class="col-12">
        <label class="form-label">Repite la contraseña</label>
        <input
          type="password"
          v-model="repeat_password"
          class="form-control"
          placeholder="Introduce de nuevo tu contraseña"
        />
      </div>
      <div class="col-12" v-if="errors.repeatpassword">
        <p>{{ errors.repeatpassword }}</p>
      </div>
      <div class="col-12" v-if="success">
        <p>{{ success }}</p>
      </div>
      <div class="col-12">
        <div @click="check" class="btn btn-primary">Guarda tus datos</div>
      </div>
        </form>
    </Tab>
    
</TabsWrapper> 
  
</div>
  
</template>

<script>

import TabsWrapper from '@/components/TabsWrapper.vue'
import Tab from '@/components/Tab.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ref, reactive } from 'vue'
export default {
  name: "Login",
  components:{
      TabsWrapper,
      Tab
  },
  setup(){
    let email = ref('')
    let password = ref('')
    let repeat_password = ref('')
    let errors = reactive({})
    let success = ref('')
    let regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;   
      
    

    const check = () => {
      if(!regExpEmail.test(email.value)) errors.email = "Debes introducir un email válido"
      if(!regExpPassword.test(password.value)) errors.password = "Debes introducir un password válido"
      if(password.value !== repeat_password.value) errors.repeatpassword = "No coincide con el password"
      if(regExpEmail.test(email.value) && regExpPassword.test(password.value) && password.value === repeat_password.value) {
        fetch('http://localhost:8081/usuario/registro', {
          method: 'POST',
          body: JSON.stringify({ 
            password: password.value, 
            email: email.value
          }),
          headers:{'Content-Type': 'application/json'}
        })
          .then(res => res.json())
          .then(response => {
            errors.email = ''
            errors.password = ''
            errors.repeatpassword = ''
            if(response._id) {
              success.value = 'Usuario creado con éxito. Revisa tu email para activar tu cuenta.'
            }
            else if(response.code === 11000) errors.email = "El email ya existe"
            else if(response.message.includes('user validation failed')) {
              if(response.errors.email) errors.email = response.errors.email.message
              if(response.errors.password) errors.password = response.errors.password.message
            }
          })
      }
      
    }

    return {
      lang: computed(()=>useStore().getters.getLang),
      email,
      password,
      repeat_password,
      errors,
      success,
      check  
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