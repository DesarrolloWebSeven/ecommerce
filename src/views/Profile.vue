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
            <div class="col-12">
              <label class="form-label">Nombre</label>
              <input
                type="text"
                v-model="user.info.firstname"
                name="firstName"
                class="form-control"
                placeholder="Introduce tu nombre"
              />
            </div>
            <div class="col-12">
              <label class="form-label">Apellidos</label>
              <input
                type="text"
                v-model="user.info.lastname"
                name="lastName"
                class="form-control"
                placeholder="Introduce tus apellidos"
              />
            </div>
            <div class="col-12">
              <label class="form-label">Email</label>
              <input
                type="email"
                v-model="user.info.email"
                name="email"
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
                    class="btn btn-success btn-lg"
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

        <div v-if="inactive">
          <form class="section row g-3">
            <div class="col-12">
              <label class="form-label">¿Estas seguro que quieres dar de baja esta cuenta?</label>
            </div>
            <div class="col-12">
              <input
                type="email"
                v-model="user.info.email"
                name="email"
                class="form-control center"
                placeholder="Introduce tu correo"
                disabled
              />
            </div>
            <div class="col-12">
              <router-link to="/perfil"
                ><p class="card-text">
                  <button
                    @click="cancel"
                    class="btn btn-success btn-lg"
                  >
                    Me lo voy a pensar
                  </button>
                </p></router-link
              >
            </div>
            <div class="col-12">
              <router-link to="/"
                ><p class="card-text">
                  <button
                    @click="confirmBaja"
                    class="btn btn-danger btn-lg"
                  >
                    Si estoy seguro
                  </button>
                </p></router-link
              >
            </div>
          </form>
        </div>

        <div v-if="orders">
          <!-- {{orders.data[0]}} -->
          <div>
            <div class="order" v-for="(order, i) in orders" :key="i">
              <p> Pedido: {{order._id}} </p>
              <p> Fecha: {{order.createdAt}} </p>
              <p> Estado: {{order.state}} </p>
              <p> Cantidad: {{order.totalProducts}} </p>
              <p> Precio: ${{order.totalPrice}} </p>
            </div>
          </div>
        </div>

        <div v-if="passChange">
          <form class="section row g-3">
            <div class="col-12">
              <label class="form-label">Introduce tu passsword actual</label>
              <input oncopy="return false" onpaste="return false" autocomplete="ÑÖcompletes"
                type="password"
                v-model="pass"
                name="passOld"
                class="form-control"
                placeholder="Introduce tu password"
              />
            </div>
            <div class="col-12">
              <label class="form-label">Ingresa el nuevo password</label>
              <input oncopy="return false" onpaste="return false" autocomplete="off"
                type="password"
                v-model="passNew"
                name="passNew"
                class="form-control"
                placeholder="Nueva contraseña"
              />
            </div>
            <div class="col-12">
              <label class="form-label">Confirma tu password</label>
              <input oncopy="return false" onpaste="return false" autocomplete="off"
                type="password"
                v-model="passNewConfirm"
                name="passNewConfirm"
                class="form-control"
                placeholder="Confirma nueva contraseña"
              />
            </div>
            <div class="col-12">
              <router-link to="/perfil"
                ><p class="card-text">
                  <button
                    @click="saveUser"
                    class="btn btn-success btn-lg"
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
import { useRoute, useRouter } from 'vue-router'
import { useStore} from 'vuex'
import { reactive, watch, onMounted, computed, ref } from 'vue'
import axios from 'axios';
export default {
  name: "Profile",
  props: {},
  setup() {
    const router = useRouter()
    const atob = require('atob')
    const store = useStore()
    const success = ref('')
    const error = ref('')
    const update = ref('')
    const inactive = ref('')
    const passChange = ref('')
    const orders = ref('')
    const pass= ref('')

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
    /*****Modificar Datos*******/
    const saveUser = async()=>{
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
      inactive.value=false
      passChange.value=false
      orders.value=false

    }

    /*****Darme de baja*********/
    function deleteCount(){
      update.value=false
      inactive.value=true
      passChange.value=false
      orders.value=false
    }
    function cancel(){
      success.value = 'Nos alegra que te lo pienses mejor!!'
        setTimeout(()=>{
          success.value=false 
          inactive.value=false
        },3000)
    }
    const confirmBaja = async()=>{
      const res = await axios.put('usuario/perfil/baja', user)
      if(res){
        localStorage.removeItem('jwt')
        localStorage.removeItem('cart')
        store.dispatch('setLogin', null)
        store.commit("setEmptyCart")
      }
      else
        error.value = 'Ha habido un problema, inténtalo nuevamente más tarde'
    }
   
    /*****Mostrar pedidos********/
    const showOrders = async()=>{
      update.value=false
      inactive.value=false
      passChange.value=false
      const res = await axios.get(`usuario/perfil/orders/${(JSON.parse(id)).id}`)
      orders.value=res.data
    }

    /*****Cambiar Pass***********/
    function editPass(){
      router.push(`/password/${(JSON.parse(id)).id}`)
      update.value=false
      inactive.value=false
      orders.value=false
      passChange.value=true
      console.log("solicictud de cambio de password")
      // const res = axios.post('usuario/password', { email: user.info.email, password: pass.value }) 
      // console.log(res)
    }

  
    function controler(valor){

    }

    return {
        user, success, error, update, inactive, passChange, orders, pass,
        saveUser, editPass, showOrders, deleteCount, updateData, cancel, confirmBaja,
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
.section .row[data-v-ced23842] {
  margin: 30px auto;
}
.col-md-4 {
  margin: auto auto;
}
.section[data-v-ced23842] {
    background-color: #10555e1e;
    max-width: 80%;
    margin-top: 55px;
    color: black;
    border-radius: 30px;
}
// .btn{
//   //background-color: #22B573;
//   // //background-color: #ff6b6b;
//   }

.order{
  background-color: rgb(121, 139, 133);
  border-radius: 30px;
  padding: 5px;
  p{
    color: blue;
  }
}
</style>