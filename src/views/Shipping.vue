<template>
  <div class="container section">
    <div class="row d-flex justify-content-center">
      <ol id="progress-bar">
        <li class="step-active">Envío</li>
        <li class="step-todo">Pago</li>
      </ol>
    </div>
    <div>
      <form class="section row g-3" @submit.prevent="saveOrder">
        <div class="col-md-6">
          <label class="form-label">Nombre</label>
          <input
            type="text"
            v-model="user.firstName"
            id="firstName"
            class="form-control"
            placeholder="Introduce tu nombre"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Apellidos</label>
          <input
            type="text"
            v-model="user.lastName"
            id="lastName"
            class="form-control"
            placeholder="Introduce tus apellidos"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Direción y número</label>
          <input
            type="text"
            v-model="user.address"
            id="adress"
            class="form-control"
            placeholder="Introduce tu dirección y número"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Piso, puerta, escalera</label>
          <input
            type="text"
            v-model="user.flat"
            id="flat"
            class="form-control"
            placeholder="Introduce tu piso, puerta, escalera"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Código Postal</label>
          <input
            type="text"
            v-model="user.postalCode"
            id="postalCode"
            class="form-control"
            placeholder="Introduce tu piso, puerta, escalera"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Ciudad</label>
          <input
            type="text"
            v-model="user.city"
            id="city"
            class="form-control"
            placeholder="Introduce tu piso, puerta, escalera"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Provincia</label>
          <input
            type="text"
            v-model="user.province"
            id="province"
            class="form-control"
            placeholder="Introduce tu piso, puerta, escalera"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">País</label>
          <input
            type="text"
            v-model="user.country"
            id="country"
            class="form-control"
            placeholder="Introduce tu piso, puerta, escalera"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Teléfono</label>
          <input
            type="tel"
            v-model="user.tel"
            id="tel"
            class="form-control"
            placeholder="Introduce tu correo"
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input
            type="email"
            v-model="user.email"
            id="email"
            class="form-control"
            placeholder="Introduce tu correo"
            required
          />
        </div>
        <div v-if="cart" class="col-12 col-md-8">
          <div v-for="(id, i) in Object.keys(cart)" :key="i" class="col-12">
            <div class="card row">
              <div class="card-horizontal row justify-content-center">
                <div
                  id="carouselExampleIndicators"
                  class="col-12 col-lg-6 m-4"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="">
                      <img
                        :src="'/images/' + cart[id].images[0]"
                        class="d-block w-100"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>

                <div class="card-body col-12 col-lg-6">
                  <div class="d-flex flex-column align-items-start">
                    <h4 class="card-title">{{ cart[id].title }}</h4>
                    <p class="card-text">
                      <b>Precio unidad: </b> {{ cart[id].price }}
                    </p>
                    <p class="card-text">
                      <b>Cantidad en tu carrito: </b> {{ cart[id].items }}
                    </p>
                    <p class="card-text">
                      <b>Subtotal producto: </b>
                      {{ (cart[id].items * cart[id].price).toFixed(2) }}
                    </p>
                  </div>
                </div>
                <Total />
              </div>
            </div>
          </div>
        </div>
        <div v-if="error"> {{ error }}</div>
        <div class="col-12">
          <p class="card-text">
            <button class="btn btn-success">Continuar</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Total from "@/components/Total";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import axios from "axios";
export default {
  name: "Shipping",
  props: {},
  components: {
    Total,
  },
  setup() {
    const router = useRouter()
    const store = useStore();
    const cart = computed(() => store.state.cart);
    const error = ref('')
    const userId = ref("");
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
        if (res.data.message === "fail") router.push("/");
        userId.value = res.data.decodedToken.id;
      } catch (err) {
        console.log(err);
      }
    };
    userAuth();

    const saveOrder = async () => {

      if(localStorage.getItem('cart')) {
        
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
      else error.value = "Tu carrito está vacío"

    };

    return {
      user,
      cart,
      error,
      saveOrder
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
    background-color: white;
    #progress-bar {
      display: flex;
      justify-content: center;
    }
  }
  // Colors
  $default: #212121;
  $grey: #efefef;
  $main-color: #ff0000;
  // Progress bar
  #progress-bar {
    display: table;
    width: 100%;
    margin: 0;
    padding: 15px 15px 0;
    table-layout: fixed;
    width: 100%;
    counter-reset: step;
    li {
      list-style-type: none;
      display: table-cell;
      width: 20%;
      float: left;
      font-size: 16px;
      position: relative;
      text-align: center;
      &:before {
        width: 50px;
        height: 50px;
        color: $default;
        content: counter(step);
        counter-increment: step;
        line-height: 50px;
        font-size: 18px;
        border: 1px solid $grey;
        display: block;
        text-align: center;
        margin: 0 auto 10px auto;
        border-radius: 50%;
        background-color: #fff;
      }
      &:after {
        width: 100%;
        height: 10px;
        content: "";
        position: absolute;
        background-color: #fff;
        top: 25px;
        left: -50%;
        z-index: -1;
      }
      &:first-child:after {
        content: none;
      }
      &.step-done {
        color: $main-color;
        &:before {
          border-color: $main-color;
          background-color: $main-color;
          color: #fff;
          content: "\f00c";
          font-family: "FontAwesome";
        }
        & + li:after {
          background-color: $main-color;
        }
      }
      &.step-active {
        color: $main-color;
        &:before {
          border-color: $main-color;
          color: $main-color;
          font-weight: 700;
        }
      }
    }
  }
}

button {
  margin-bottom: 200px;
}
</style>