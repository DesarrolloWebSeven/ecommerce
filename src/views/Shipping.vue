<template>
  <main class="main-content">
    <section class="order-page">
      <section class="order-info">
          <div class="order-titles">
            <h2>{{ lang['data'] }}</h2>
            <h2>{{ lang['payment'] }}</h2>
            <h2>{{ lang['shipping'] }}</h2>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 5%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">0%</div>
          </div>
      </section>
      <div class="order-summary">
        <form class="order-form" id="formOrder" @submit.prevent="saveOrder">
          <div>
            <label for="firstName">Nombre</label>
            <input type="text" v-model="user.firstName" id="firstName" placeholder="Introduce tu nombre" required />
            <p v-if="errors.firstName" class="alert alert-danger" role="alert">{{ errors.firstName }}</p>
          </div>
          <div>
            <label for="lastName">Apellidos</label>
            <input type="text" v-model="user.lastName" id="lastName" placeholder="Introduce tus apellidos" required />
            <p v-if="errors.lastName" class="alert alert-danger" role="alert">{{ errors.lastName }}</p>
          </div>
          <div>
            <label for="address">Direción y número</label>
            <input type="text" v-model="user.address" id="adress" placeholder="Introduce tu dirección y número" required />
            <p v-if="errors.address" class="alert alert-danger" role="alert">{{ errors.address }}</p>
          </div>
          <div>
            <label for="flat">Piso, puerta, escalera</label>
            <input type="text" v-model="user.flat" id="flat" placeholder="Introduce tu piso, puerta, escalera" required />
            <p v-if="errors.flat" class="alert alert-danger" role="alert">{{ errors.flat }}</p>
          </div>
          <div>
            <label for="postalCode">Código Postal</label>
            <input type="text" v-model="user.postalCode" id="postalCode" placeholder="Introduce tu código postal" required />
            <p v-if="errors.postalCode" class="alert alert-danger" role="alert">{{ errors.postalCode }}</p>
          </div>
          <div>
            <label for="city">Ciudad</label>
            <input type="text" v-model="user.city" id="city" placeholder="Introduce tu ciudad" required />
            <p v-if="errors.city" class="alert alert-danger" role="alert">{{ errors.city }}</p>
          </div>
          <div>
            <label for="province">Provincia</label>
            <input type="text" v-model="user.province" id="province" placeholder="Introduce tu provincia" required />
            <p v-if="errors.province" class="alert alert-danger" role="alert">{{ errors.province }}</p>
          </div>
          <div>
            <label>País</label>
            <input type="text" v-model="user.country" id="country" placeholder="Introduce tu país" required />
            <p v-if="errors.country" class="alert alert-danger" role="alert">{{ errors.country }}</p>
          </div>
          <div>
            <label for="tel">Teléfono</label>
            <input type="tel" v-model="user.tel" id="tel" placeholder="Introduce tu teléfono" required />
            <p v-if="errors.tel" class="alert alert-danger" role="alert">{{ errors.tel }}</p>
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" v-model="user.email" id="email" placeholder="Introduce tu email" required />
            <p v-if="errors.email" class="alert alert-danger" role="alert">{{ errors.email }}</p>
          </div>
        </form>
        <div class="order-products">
          <div class="order-list" v-if="Object.keys(cart).length">
            <div v-for="(id, i) in Object.keys(cart)" :key="i">
              <div class="item-summary">
                <img :src="'/images/' + cart[id].images[0]" />
                <h2>{{ cart[id].title }}</h2>
                <p>{{ cart[id].items }} ud.</p>
                <p>{{ (cart[id].items * cart[id].price).toFixed(2) }} €</p>
              </div>
            </div>
          </div>
          <div class="order-total">
            <p class="order-price">TOTAL: {{(totalPrice).toFixed(2)}} €</p>
            <button class="order-button" form="formOrder">Continuar al pago</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
  name: "Shipping",
  props: {},
  setup() {
    const router = useRouter()
    const store = useStore()
    const cart = computed(() => store.state.cart)
    const totalPrice = computed(() => store.getters.totalPrice) 
    const userId = ref("")
    const error = ref('')
    let errors = ref({});
    let regExpText = /^[^]+$/;
    let regExpEmail = /^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regExpPostalCode = /^(?:0?[1-9]|[1-4]\d|5[0-2])\d{3}$/;  
    let regExpTel = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;  
    
    let user = reactive({
      firstName: '',
      lastName: '',
      address: '',
      tel: '',
      country: '',
      province: '',
      city: '',
      email: '',
      flat: '',
      postalCode: ''
    });
    const userAuth = async () => {
      
      try {
        const res = await axios.get("usuario/permiso", {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        });
        if (res.data.message === "fail") {
          let res = confirm('Es necesario iniciar sesión para finalizar la compra. ¿Desea iniciarla ahora?')
          if (res) router.push({ name: 'Login'})
          else router.go(-1)
        }
        if (!localStorage.getItem('cart')) router.go(-1)
        if (res.data.message === "success")userId.value = res.data.decodedToken.id;
      } catch (err) {
        console.log(err);
      }
      
    };
    userAuth();

    const saveOrder = async () => {
            
        if (!regExpText.test(user.firstName))
        errors.value.firstName = "Introduce un nombre válido";
        if (!regExpText.test(user.lastName))
        errors.value.lastName = "Introduce apellidos válidos";
        if (!regExpText.test(user.address))
        errors.value.address = "Introduce una dirección válida";
        if (!regExpText.test(user.flat))
        errors.value.flat = "Introduce un número válido";
        if (!regExpPostalCode.test(user.postalCode))
        errors.value.postalCode = "Introduce un código postal válido";
        if (!regExpText.test(user.city))
        errors.value.city = "Introduce una ciudad válida";        
        if (!regExpText.test(user.province))
        errors.value.province = "Introduce una provincia válida";
        if (!regExpText.test(user.country))
        errors.value.country = "Introduce un país válido";
        if (!regExpTel.test(user.tel))
        errors.value.tel = "Introduce un número de teléfono válido";
        if (!regExpEmail.test(user.email))
        errors.value.email = "Introduce un email válido";
        
      if (
        regExpText.test(user.firstName) && 
        regExpText.test(user.lastName) && 
        regExpText.test(user.address) && 
        regExpTel.test(user.tel) && 
        regExpText.test(user.country) && 
        regExpText.test(user.province) && 
        regExpText.test(user.city) && 
        regExpEmail.test(user.email) && 
        regExpText.test(user.flat) && 
        regExpPostalCode.test(user.postalCode)) {
      
        try {
          const res = await axios.post("productos/pedido", {
            userId: userId.value,
            user: user,
            totalPrice: store.getters.totalPrice,
            totalProducts: store.getters.totalQuantity,
            cart: store.state.cart,
          });
          if(res.data) {
            localStorage.setItem('order', JSON.stringify(res.data._id))
            router.push('/carrito/pago')
          }
        } catch (err) {
          console.log(err.message);
        }
      } 
      
    };
    return {
      lang: computed(() => useStore().getters.getLang),
      totalPrice,
      error,
      user,
      cart,
      saveOrder,
      errors,
      regExpText,
      regExpEmail,
      regExpPostalCode,
      regExpTel


    };
  },
};
</script>


<style lang="scss" scoped>
.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-page {
  width: 80%;
  margin: 110px auto 90px;
  color: black;

  .order-info {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;

    h2 {
      font-size: 1.5rem;
    }

    .order-titles {
      display: flex;
      justify-content: space-between;
    }

    .progress-bar {
      background-color: #22B573;
    }
  }
}

p.alert {
  font-size: 0.7rem;
} 

.order-summary {
  margin: 40px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

@media (max-width: 1000px) {
  .order-summary {
    flex-direction: column;
  }
}

.order-form {
    width: 49%;
    padding: 20px 15px;
    background-color: rgb(219, 219, 219);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    >div {
      width: 49%;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }

    label {
      font-size: 0.9rem;
      text-align: left;
    }

    input {
      font-size: 0.8rem;
      border: none;
      border-radius: 3px;
    }
    
}

  @media (max-width: 1000px) {
      .order-form {
        width: 100%;

        >div {
          width: 100%;
        }
      }
  }

.order-products {
  width: 50%;
}

@media (max-width: 1000px) {
  .order-products {
    width: 100%;
  }
}

.order-list {
  width: 100%;
  padding: 20px;
  border: 1px solid rgb(185, 183, 183);
  border-radius: 10px;
  background-color: white;
}

@media (max-width: 1000px) {
  .order-list {
    margin-top: 20px;
  }
}

.item-summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    border-left: 15px solid #FFC61A;
    border-bottom: 0.5px solid rgb(204, 203, 203);
    padding: 5px 10px;

    img {
      width: 13%;
    }

    h2 {
      width: 50%;
      font-size: 0.9rem;
      font-weight: 600;
      text-align: left;
      padding-left: 10px;
    }

    p {
      width: 15%;
      text-align: center;
      font-size: 0.8rem;
      margin: 0;
    }

    p:last-child {
      text-align: right;
    }
}

@media (max-width: 600px) {
  
  .item-summary {
    border-left: 5px solid #FFC61A;
    padding: 5px;

    img {
      width: 10%;
    }

    h2 {
      width: 50%;
      font-size: 0.7rem;
      font-weight: 400;
    }

    p {
      width: 15%;
      font-size: 0.7rem;
    }

    p:last-child {
      width: 25%;
    }
  }

}

.order-total {
  width: 100%;

  .order-price {
    width: 100%;
    text-align: right;
    padding-top: 10px;
    color: black;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 10px;
  }

  .order-button {
    width: 35%;
    border-radius: 5px;
    padding: 10px;
    border: none;
    display: block;
    margin-left: auto;
    background-color: #22B573;
    color: white;
  }

  .order-button:hover {
    opacity: 60%;
  }
}

@media (max-width: 1000px) {
  .order-total {
    margin-top: 10px;

    .order-price {
      text-align: center;
    }

    .order-button {
      width: 100%;
    }
  }
}

</style>
