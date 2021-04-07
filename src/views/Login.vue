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
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
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
      <div class="col-12">
        <label class="form-label">Repite la contraseña</label>
        <input
          type="text"
          name="repeat_password"
          id="repeat_password"
          class="form-control"
          placeholder="Introduce de nuevo tu contraseña"
        />
      </div>
      
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Guarda tus datos</button>
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
export default {
  name: "Login",
  setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  },
  components:{
      TabsWrapper,
      Tab
  }
};




</script>

<style lang="scss" scoped>
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
   
}

</style>