<template>
  <div class="container section">
    <div class="row d-flex justify-content-center">
      <ol id="progress-bar">
        <li class="step-done">Envío</li>
        <li class="step-active">Pago</li>
      </ol>
    </div>
    <div>
      <form class="section row g-3" @submit.prevent="emptyCart">
        <div class="col-md-8">
          <label class="form-label">Titular de la cuenta</label>
          <input
            type="text"
            name="accountOwner"
            id="accountOwner"
            class="form-control"
            placeholder="Introduce el titular de la cuenta"
            required
          />
          <label class="form-label">Número de tarjeta</label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            class="form-control"
            placeholder="Introduce el número de tarjeta"
            required
          />
          <label class="form-label">Fecha de vencimiento</label>
          <input
            type="text"
            name="expiry"
            id="expiry"
            class="form-control"
            placeholder="Introduce la fecha de vencimiento"
            required
          />
          <label class="form-label">Código de seguridad</label>
          <input
            type="text"
            name="securityCode"
            id="securityCode"
            class="form-control"
            placeholder="Introduce el código de seguridad"
            required
          />
        </div>
        <div v-if="error">{{ error }}</div>
        <div v-if="success"> {{ success }}</div>
        <div class="col-12">
          <button class="btn btn-success m-2">Realizar pago</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { computed, ref } from 'vue';
export default {
  name: "Payment2",
  props: {},
  setup() {
    const router = useRouter()
    const store = useStore();
    const success = ref('')
    const error = ref('')
    const cart = computed(() => store.state.cart);
    
    
    const emptyCart = async () => {
      
      if(localStorage.getItem('order')) {
      localStorage.removeItem('cart')
      store.commit("setEmptyCart");
      
        try {
          const res = await axios.put('/productos/pago', {
            orderId : JSON.parse(localStorage.getItem('order'))
          })
          if(res.data) {
            success.value = 'Tu pedido se ha realizado con éxito'
            localStorage.removeItem('order')
          }
        } catch (err) {
          console.log(err.message)
        }
      } else {
        success.value = ''
        error.value = "No tienes ningún pedido pendiente"
      }
    }

    const userAuth = async () => {

      try {
        const res = await axios.get('usuario/permiso', {
          headers: { Authorization: "Bearer " + localStorage.getItem('jwt')}
        })
        if(res.data.message === 'fail') router.push('/')
      } catch (err) {
        console.log(err)
      }

    }
    userAuth()

    return {
      cart,
      success,
      error,
      emptyCart,
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
    .payment {
      width: 300px;
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
</style>