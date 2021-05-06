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

        <div v-if="status.orders" class="section row g-3 scroll">
          <div v-for="(order, i) in orders" :key="i">
            <div class="card border-success mb-3">
              <div class="card-header bg-transparent border-success">
                <label class="strong profile-verview">Número de Referencia Pedido :</label>
                <p class="info-productos"> {{order._id}} </p>
              </div>
              <div class="card-body text-success">
                <i class="bi bi-credit-card"></i> {{order.state}} <hr>
                <div class="body-card-items">
                  <div class="col-12 item">
                    <div class="profile-overview">
                      <div v-for="(product, j) in products" :key="j">
                        <img class="img-product" :src="'/images/' + product.images[0]">
                        {{product.title}} 
                        € {{product.price}}
                        {{product.items}} UND
                        <hr>
                      </div>
                      <p class="">ARTICULOS</p>
                      <h4>{{order.totalProducts}} und.</h4>
                    </div>
                  </div>
                  <div class="col-12 item">
                    <div class="profile-overview">
                      <p class="">PRECIO</p>
                      <h4>€{{order.totalPrice}}</h4>
                    </div>
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
    const products = reactive([])
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
      for (const product in res.data[0].cart) {
        products.push(res.data[0].cart[product])

      }
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
        user, success, error, orders, status, products,
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

.section .row {
  margin: 30px auto;
}

.btn-outline-warning:hover {
  color: white;
  background-color: #22B573;
  border-color: #329e7e;
  opacity: 60%;
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

.strong{
  font-size: small;
  font-weight: 600;
}

.border-success {
  border-color: #22B573 !important;
}
.text-success {
    color: #22B573 !important;
}
.body-card-items{
  display: grid;
  justify-items: stretch;
  align-items: stretch;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 10px;
}

.scroll{
  overflow-y: auto;
  height: 400px;
}

.item{
  border: 1px solid #22B573;
}
.img-product{
  width: 50px;
}
.info-productos{
    color: #22B573 !important;
    font-weight: 600;
    
}
</style>