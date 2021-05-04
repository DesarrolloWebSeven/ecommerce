<template>
  <div class="container section">
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <img class="avatar" src="@/assets/avatar.png" alt="" />
        <p>Bienvenid@!!</p>
        <p>{{user.info.firstname}}</p>
        <p><button @click="updateData" class="btn btn-outline-warning">Modificar datos</button></p>
        <p><button @click="deleteCount" class="btn btn-outline-warning">Darme de baja</button></p>
        <p><button @click="showOrders" class="btn btn-outline-warning">Ver mis pedidos</button></p>
        <p><button @click="editPass" class="btn btn-outline-warning">Cambiar mi Pass</button></p>
      </div>

      <div class="col-md-8">
        <div v-if="status.default">
          Por defecto aui va algo
        </div>
        <div v-if="status.update">
          <form class="section row g-3">
            <div class="col-12">
              <label class="form-label">Nombre</label>
              <input type="text" v-model="user.info.firstname" name="firstName" class="form-control" placeholder="Introduce tu nombre"/>
            </div>
            <div class="col-12">
              <label class="form-label">Apellidos</label>
              <input type="text" v-model="user.info.lastname" name="lastName" class="form-control" placeholder="Introduce tus apellidos"/>
            </div>
            <div class="col-12">
              <label class="form-label">Email</label>
              <input type="email" v-model="user.info.email" name="email" class="form-control" placeholder="Introduce tu correo" disabled/>
            </div>
            <div class="col-12">
              <router-link to="/perfil">
                <p class="card-text">
                  <button @click="saveUser" class="btn btn-success btn-lg"> Guardar cambios</button>
                </p>
              </router-link>
            </div>
          </form>
          <!-- Confirmacion o error de update -->
          <div v-if="success" class="alert alert-success text-center" role="alert"> {{ success }} </div>
          <div v-if="error" class="alert alert-danger text-center" role="alert"> {{ error }} </div>
        </div> 

        <div v-if="status.inactive">
          <form class="section row g-3">
            <div class="col-12">
              <label class="form-label">¿Estas seguro que quieres dar de baja esta cuenta?</label>
            </div>
            <div class="col-12">
              <input type="email" v-model="user.info.email" name="email" class="form-control center" placeholder="Introduce tu correo" disabled/>
            </div>
            <div class="col-12">
              <router-link to="/perfil">
                <p class="card-text">
                  <button @click="cancel" class="btn btn-success btn-lg"> Me lo voy a pensar</button>
                </p>
              </router-link>
            </div>
            <div class="col-12">
              <router-link to="/">
                <p class="card-text">
                  <button @click="confirmBaja" class="btn btn-danger btn-lg"> Si estoy seguro</button>
                </p>
              </router-link>
            </div>
          </form>
          <!-- Confirmacion o error de update -->
          <div v-if="success" class="alert alert-success text-center" role="alert"> {{ success }} </div>
          <div v-if="error" class="alert alert-danger text-center" role="alert"> {{ error }} </div>
        </div>

        <div v-if="status.orders">
          <div v-for="(order, i) in orders" :key="i">
            <div class="card border-success mb-3" style="max-width: 18rem;">
              <div class="card-header bg-transparent border-success">
                <label class="strong">Número de Referencia Pedido :</label> 
                <p> {{order._id}} </p>
              </div>
              <div class="card-body text-success">
                <h5 class="card-title"><label class="strong">Estado:</label> {{order.state}} </h5><hr>
                <p class="card-text">Soment.</p>
                  <div class="col-4">
                    <div class="profile-overview">
                      <p>ARTICULOS</p>
                      <h4>{{order.totalProducts}}</h4>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="profile-overview">
                      <p>PRECIO:</p>
                      <h4>${{order.totalPrice}}</h4>
                    </div>
                  </div>
              </div>
              <div class="card-footer bg-transparent border-success"><p> Fecha: {{order.createdAt}} </p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore} from 'vuex'
import { reactive, computed, ref } from 'vue'
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
    const orders = ref('')
    let status = reactive({
      default:true,
      update:false,
      inactive:false,
      orders:false,
    })
    //Recuperando id de usuario
    const user = reactive({info:'default'})
    let jwt = computed(()=>{
        return store.getters.getToken
    })
    const b64 = jwt.value.split('.')
    var id = atob(b64[1])
    //Request inicial
    //      const res = await axios.put('usuario/perfil/baja', user)
    fetch(`http://localhost:8081/usuario/perfil/${(JSON.parse(id)).id}`)
      .then((res) => res.json())
      .then((data) => { user.info=data })
      .catch((err) => console.log(err))  

    const updateData =()=>{controler('update')}    
    const deleteCount =()=>{controler('inactive')}
    const editPass =()=>{router.push(`/password/${(JSON.parse(id)).id}`)}

    /*****Modificar Datos*******/
    const saveUser = async()=>{
      const res = await axios.put('usuario/perfil/update', user)
      if(res){
        success.value = 'Datos actualizados!!'
        setTimeout(()=>{
          success.value=false 
          status.update=false
          status.default=true
        },2000)
      }else
        error.value = 'Ha habido un problema, inténtalo más tarde'
    }

    /*****Darme de baja*********/
    function cancel(){
      success.value = 'Nos alegra que te lo pienses mejor!!'
        setTimeout(()=>{
          success.value=false 
          status.inactive=false
          status.default=true
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
      controler('orders')
      const res = await axios.get(`usuario/perfil/orders/${(JSON.parse(id)).id}`)
      orders.value=res.data
    }

    /*****Controlador de vistas***********/
    function controler(valor){
      for (const section in status) {
        if (valor == section) status[`${section}`]=true
        else status[`${section}`]=false
      }
    }

    return {
        user, success, error, orders, status,
        saveUser, editPass, showOrders, deleteCount, updateData, cancel, confirmBaja,
    }
  }
}

</script>


<style lang="scss" scoped>
.section {
  background-color: #10555e1e;
  max-width: 80%;
  margin-top: 70px;
  color: black;
  border-radius: 30px;

  .row {
    max-width: 95%;
    margin: 0 auto;
    padding: 20px;
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

.btn-outline-warning:hover {
    color: white;
    background-color: #22B573;
    border-color: #329e7e;
    opacity: 60%;
}

.order{
  background-color: rgb(121, 139, 133);
  border-radius: 30px;
  padding: 5px;
  p{
    color: #000;
  }
}
button {
    width: 100%;
    align-self: center;
    border: none;
    border-radius: 5px;
    padding: 5px 0;
    color: white;
    background-color: #22B573;
    margin-top: 10px;
    text-transform: none;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}

.card-container {
    padding: 100px 0px;
    -webkit-perspective: 1000;
    perspective: 1000;
}

.profile-card-4 {
    max-width: 300px;
    background-color: #FFF;
    border-radius: 5px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    margin: 10px auto;
    cursor: pointer;
}

.profile-card-4 img {
    transition: all 0.25s linear;
}

.profile-card-4 .profile-content {
    position: relative;
    padding: 15px;
    background-color: #FFF;
}

.profile-card-4 .profile-name {
    font-weight: bold;
    position: absolute;
    left: 0px;
    right: 0px;
    top: -70px;
    color: #FFF;
    font-size: 17px;
}

.profile-card-4 .profile-name p {
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1.5px;
}

.profile-card-4 .profile-description {
    color: #777;
    font-size: 12px;
    padding: 10px;
}

.profile-card-4 .profile-overview {
    padding: 15px 0px;
}

.profile-card-4 .profile-overview p {
    font-size: 10px;
    font-weight: 600;
    color: #777;
}

.profile-card-4 .profile-overview h4 {
    color: #273751;
    font-weight: bold;
}

.profile-card-4 .profile-content::before {
    content: "";
    position: absolute;
    height: 20px;
    top: -10px;
    left: 0px;
    right: 0px;
    background-color: #FFF;
    z-index: 0;
    transform: skewY(3deg);
}

.profile-card-4:hover img {
    transform: rotate(5deg) scale(1.1, 1.1);
    filter: brightness(110%);
}
.strong{
  font-size: small;
  font-weight: 600;
}

</style>