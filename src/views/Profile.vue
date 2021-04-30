<template>
  <div class="container section">
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <img class="avatar" src="@/assets/avatar.png" alt="" />
        <!-- <p>{{user}}</p> -->
        <p>Bienvenid@!!</p>
        <p>{{user.info.firstname}}</p>
        <!-- <p>codigo porstal, ciudad, provincia</p> -->
        <p><button @click="updateData" class="btn btn-outline-warning">Modificar datos</button></p>
        <p><button @click="deleteCount" class="btn btn-outline-danger">Darme de baja</button></p>
        <p><button @click="showOrders" class="btn btn-outline-info">Ver mis pedidos</button></p>
        <p><button @click="editPass" class="btn btn-outline-dark">Cambiar mi Pass</button></p>
      </div>

      <div class="col-md-8">
        <div v-if="update">
          <form class="section row g-3">
            <div class="col-md-6">
              <label class="form-label">Nombre</label>
              <input
                type="text"
                v-model="user.info.firstname"
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
                v-model="user.info.lastname"
                name="lastName"
                id="lastName"
                class="form-control"
                placeholder="Introduce tus apellidos"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input
                type="email"
                v-model="user.info.email"
                name="email"
                id="email"
                class="form-control"
                placeholder="Introduce tu correo"
                disabled
              />
            </div>
            <div class="col-12">
              <router-link to="/perfil"
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
          <!-- Confirmacion o error de update -->
          <div v-if="success" class="alert alert-success text-center" role="alert"> {{ success }} </div>
          <div v-if="error" class="alert alert-danger text-center" role="alert"> {{ error }} </div>
        </div>  
        <!-- Mensaje de alerta para eliminar cuenta -->
        <!-- template for the modal component -->

          <!-- <prueba /> -->
              <modal name="my-first-modal">
                  This is my first modal
              </modal>
              <v-dialog />

      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore} from 'vuex'
import { reactive, watch, onMounted, computed, ref } from 'vue'
import axios from 'axios';
import prueba from '@/components/prueba'
import VModal from 'vue-js-modal' //aqui quede revisar que es vue.use()
export default {
  name: "Profile",
  components:{
    prueba
  },
  props: {},
  setup() {
    const atob = require('atob')
    const store = useStore()
    const success = ref('')
    const error = ref('')
    const update = ref('')
    const confirm = ref('')

    const route = useRoute()
    const user = reactive({info:'default'})
    let jwt = computed(()=>{
        return store.getters.getToken
    })
    const b64 = jwt.value.split('.')
    var id = atob(b64[1])
      // watch(()=> route.params,
      // async newParams=> {        
      //   user.arr= await getUser(newParams.id)
       
      // })

    fetch(`http://localhost:8081/usuario/perfil/${(JSON.parse(id)).id}`)
      .then((res) => res.json())
      .then((data) => { user.info=data })
      .catch((err) => console.log(err))  
    
    
        //.then((data) => data.forEach((item) => user.push(item)))

    // onMounted(()=>{ 
    //   getUser(route.params.id)      
    // }) 
    const saveUser = async ()=>{
      const res = await axios.put('usuario/perfil/update', user)
      if(res){
        success.value = 'Datos actualizados!!'
        setTimeout(()=>{
          success.value=false 
          update.value=false
        },3000)
      }else
        error.value = 'Ha habido un problema, inténtalo más tarde'
    }

    function updateData(){
      update.value=true
    }

    const deleteCount = async ()=>{
          console.log("borrar cuenta")
          confirm.value=true
    
      // const res = await axios.put('usuario/perfil/baja', user)
      // console.log(res)
      // fetch(`http://localhost:8081/admin/cliente/${(JSON.parse(id)).id}`,{
      //   method:'PUT',
      //   headers:{'Content-type':'Application/json'},
      //   body:user
      // })
    }
    
    function showOrders(){
      console.log("mostrar pedidos")
    }
    function editPass(){
      console.log("solicictud de cambio de password")
    }

    function show () {
      this.$modal.show('my-first-modal');
    }
    function hide () {
      this.$modal.hide('my-first-modal');
    }
    
    onMounted (()=>{
        this.show()
    })

    return {
        user, success, error, update, confirm,
        saveUser, editPass, showOrders, deleteCount, updateData,
        modalShow: false
    }
  }
}


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