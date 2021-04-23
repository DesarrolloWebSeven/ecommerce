<template>
  <div class="container section">
    <div class="row d-flex justify-content-center">
      <h1>Perfil</h1>
      <div class="col-md-4">
        <img class="avatar" src="@/assets/avatar.png" alt="" />

        <p>nombre</p>
        <p>direction</p>
        <p>codigo porstal, ciudad, provincia</p>

        <!-- <button class="btn btn-danger">Editar</button> -->
      </div>
      <div class="col-md-8">
        <div>
          <form class="section row g-3">
            <div class="col-md-6">
              <label class="form-label">Nombre</label>
              <input
                type="text"
                v-model="user.firstName"
                name="firstName"
                id="firstName"
                class="form-control"
                placeholder="Introduce tu nombre"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Apellidos</label>
              <input
                type="text"
                v-model="user.lastName"
                name="lastName"
                id="lastName"
                class="form-control"
                placeholder="Introduce tus apellidos"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Direción y número</label>
              <input
                type="text"
                v-model="user.adress"
                name="adress"
                id="adress"
                class="form-control"
                placeholder="Introduce tu dirección y número"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Piso, puerta, escalera</label>
              <input
                type="text"
                v-model="user.flat"
                name="flat"
                id="flat"
                class="form-control"
                placeholder="Introduce tu piso, puerta, escalera"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Código Postal</label>
              <input
                type="text"
                v-model="user.postalCode"
                name="postalCode"
                id="postalCode"
                class="form-control"
                placeholder="Introduce tu piso, puerta, escalera"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Ciudad</label>
              <input
                type="text"
                v-model="user.city"
                name="city"
                id="city"
                class="form-control"
                placeholder="Introduce tu piso, puerta, escalera"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Provincia</label>
              <input
                type="text"
                v-model="user.province"
                name="province"
                id="province"
                class="form-control"
                placeholder="Introduce tu piso, puerta, escalera"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">País</label>
              <input
                type="text"
                v-model="user.country"
                name="country"
                id="country"
                class="form-control"
                placeholder="Introduce tu piso, puerta, escalera"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Teléfono</label>
              <input
                type="tel"
                v-model="user.tel"
                name="tel"
                id="tel"
                class="form-control"
                placeholder="Introduce tu correo"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input
                type="email"
                v-model="user.email"
                name="email"
                id="email"
                class="form-control"
                placeholder="Introduce tu correo"
              />
            </div>

            <div class="col-12">
              <router-link to="/carrito/resumen"
                ><p class="card-text">
                  <button
                    @click="saveUser"
                    class="btn btn-success continuar m-2"
                  >
                    Guardar cambios
                  </button>
                </p></router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, watch, onMounted } from 'vue'
export default {
  name: "Profile",
  props: {},
  setup() {
    const route= useRoute()
    let user = reactive({});

/*
    watch(()=> route.params,
      async newParams=> {        
        user.arr= await getUser(newParams.id)
       
      })

    function getUser(id) {      
       
        fetch(`http://localhost:8081/perfil/${id}`)
        .then((res) => res.json())
        .then((data) => data.forEach((item) => user.push(item)))
        .catch((err) => console.log(err));   
        
    }

    onMounted(()=>{ 
      getUser(route.params.id)      
    }) */


    return {
        user
    };
  },
};
</script>


<style lang="scss" scoped>
.section {
  background-color: #10555e1e;
  max-width: 80%;
  margin-top: 30px;
  color: black;

  .row {
    max-width: 95%;
    margin: 0 auto;
    padding: 20px;
  }
  h1 {
    color: black;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>