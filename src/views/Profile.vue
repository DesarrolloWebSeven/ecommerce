<template>
  <main class="main-content">
    <section class="profile-page">
      <div class="profile-menu">
        <i class="fas fa-user-circle"></i>
        <h1>¡Bienvenid@!</h1>
        <p>{{user.info.firstname}}</p>
        <button @click="updateData">Modificar datos</button>
        <button @click="deleteCount">Darme de baja</button>
        <!-- <p><button @click="showOrders" class="btn btn-outline-warning">Ver mis pedidos</button></p> -->
        <button @click="editPass">Cambiar mi Pass</button>
      </div>
      <form v-if="status.update" class="profile-info" @submit.prevent="saveUser">
        <label>Nombre</label>
        <input type="text" v-model="user.info.firstname" name="firstName" placeholder="Introduce tu nombre"/>
        <label>Apellidos</label>
        <input type="text" v-model="user.info.lastname" name="lastName" placeholder="Introduce tus apellidos"/>
        <label>Email</label>
        <input type="email" v-model="user.info.email" name="email" placeholder="Introduce tu correo" readonly/>
        <div v-if="success" class="alert alert-success text-center" role="alert"> {{ success }} </div>
        <div v-if="error" class="alert alert-danger text-center" role="alert"> {{ error }} </div>
        <button type="submit">Guardar cambios</button>
      </form>
      <form v-if="status.inactive" class="profile-info">
        <label>¿Estas seguro que quieres dar de baja esta cuenta?</label>
        <input type="email" v-model="user.info.email" name="email" placeholder="Introduce tu correo" readonly/>
        <div v-if="success" class="alert alert-success text-center" role="alert"> {{ success }} </div>
        <div v-if="error" class="alert alert-danger text-center" role="alert"> {{ error }} </div>
        <button @click="cancel">Me lo voy a pensar</button>
        <button @click="confirmBaja"> Si estoy seguro</button>
      </form>

        <!-- <div v-if="status.orders" class="section row g-3 scroll">
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
        </div> -->
    </section>
  </main>
</template>

<script>
import Product from '@/components/Product'
import { useRouter } from 'vue-router'
import { useStore} from 'vuex'
import { reactive, computed, ref } from 'vue'
import axios from 'axios';
export default {
  name: "Profile",
  props: {},
  components:{Product},
  setup() {
    const router = useRouter()
    const atob = require('atob')
    const store = useStore()
    const success = ref('')
    const error = ref('')
    const orders = ref('')
    const products = reactive([])
    const productDefault = reactive({})
    let status = reactive({
      update:true,
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
    
    const getOneProduct = () => {     
        fetch(`http://localhost:8081/productos/perfil/default`)
        .then(res => res.json())
        .then(data => {
          productDefault.value = data
          console.log(productDefault.value)
        })
        .catch(err => console.log(err))
    }
    getOneProduct()
  

    const updateData =()=>{controler('update')}    
    const deleteCount =()=>{controler('inactive')}
    const editPass =()=>{router.push(`/password/${(JSON.parse(id)).id}`)}

    // Modify User Info
    const saveUser = async()=>{
      const res = await axios.put('usuario/perfil/update', user)
      if(res){
        success.value = 'Datos actualizados correctamente'
        setTimeout(()=>{
          success.value=false 
          status.update= true
        },2000)
      }else
        error.value = 'Ha habido un problema, inténtalo más tarde'
    }

    // Inactive User account
    function cancel(){
      success.value = 'Nos alegra que te lo pienses mejor'
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
        router.push('/')
      }
      else
        error.value = 'Ha habido un problema, inténtalo más tarde'
    }
   
    // Show User orders
    const showOrders = async()=>{
      controler('orders')
      const res = await axios.get(`usuario/perfil/orders/${(JSON.parse(id)).id}`)
      for (const product in res.data[0].cart) {
        products.push(res.data[0].cart[product])
      }
      orders.value=res.data
    }

    // View Controller
    function controler(valor){
      for (const section in status) {
        if (valor == section) status[`${section}`]=true
        else status[`${section}`]=false
      }
    }

    return {
        user, success, error, orders, status, products, productDefault,
        saveUser, editPass, showOrders, deleteCount, updateData, cancel, confirmBaja,
    }
  }
}

</script>


<style lang="scss" scoped>
.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-page {
  margin: 120px auto 90px;
  width: 80%;
  max-width: 800px;
  color: rgb(99, 98, 98);
  display: flex;
  justify-content: space-between;
}

.profile-menu {
  width: 28%;
  min-height: 300px;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgb(197, 197, 197);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 0;

  i {
    font-size: 4rem;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  button {
  width: 80%;
  align-self: center;
  border: none;
  border-radius: 5px;
  padding: 5px 0;
  margin: 10px 0;
  color: white;
  background-color: #22B573;
  }

  button:hover {
    opacity: 60%;
  }

  button:focus {
    outline: none;
  }
}

.profile-info {
  width: 68%;
  min-height: 300px;
  padding: 35px;
  border-radius: 10px;
  background-color: rgb(240, 239, 239);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;

  button {
  width: 80%;
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
}

@media (max-width: 800px) {
  .profile-menu, .profile-info {
    width: 100%;
  }
}


</style>