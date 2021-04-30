<template>
  <main class="payment-page">
    <section class="payment-info">
      <div class="payment-titles">
        <h2>{{ lang['data'] }}</h2>
        <h2>{{ lang['payment'] }}</h2>
        <h2>{{ lang['shipping'] }}</h2>
      </div>
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="width" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{{ progress }}</div>
      </div>
    </section>
    <form @submit.prevent="emptyCart">
      <div class="payment-methods">
        <i class="fab fa-cc-visa"></i>
        <i class="fab fa-cc-mastercard"></i>
        <i class="fab fa-cc-amex"></i>
        <i class="fab fa-cc-paypal"></i>
      </div>
      <label for="owner">{{ lang['accountHolder'] }}</label>
      <input type="text" id="owner" :placeholder="lang['plAccountHolder']" required />
      <label for="cardNumber">{{ lang['creditCard'] }}</label>
      <input type="text" id="cardNumber" minlenght="12" maxlenght="12" :placeholder="lang['plCreditCard']" required />
      <div class="cardinfo">
        <div class="card-date">
          <label for="expiry">{{ lang['expirationDate'] }}</label>
          <input type="date" id="expiry" :placeholder="lang['plExpirationDate']" required />
        </div>
        <div class="card-code">
          <label for="securityCode">{{ lang['securityCode'] }}</label>
          <input type="number" id="securityCode" minlenght="3" maxlenght="3" :placeholder="lang['plSecurityCode']" required/>
        </div>
      </div>
      <div v-if="success" class="alert alert-success text-center" role="alert"> {{ success }} </div>
      <div v-if="error" class="alert alert-danger text-center" role="alert"> {{ error }} </div>
      <button type="submit">{{ lang['buttonPay'] }}</button>
      </form>
  </main>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
export default {
  name: "Payment2",
  props: {},
  setup() {
    const router = useRouter()
    const store = useStore();
    const success = ref('')
    const error = ref('')
    const width= ref('width: 50%;')
    const progress = ref('50%')
    const cart = computed(() => store.state.cart);
    
    
    const emptyCart = async () => {

      if(Object.keys(cart).length) {
        store.commit("setEmptyCart");
        
        try {
          const res = await axios.put('/productos/pago', {
            orderId : JSON.parse(localStorage.getItem('order'))
          })
          if(res.data) {
            success.value = 'Tu pedido se ha realizado con éxito'
            width.value = 'width: 100%'
            progress.value = '100%'
            localStorage.removeItem('cart')
            localStorage.removeItem('order')
          }
          else error.value = "Ha habido un problema, inténtalo más tarde"
        } catch (err) {
          console.log(err.message)
        }
      } else {
        error.value = "No tienes pedidos pendientes de pago"
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

    const availableOrder = () => {

      try {
        if(!localStorage.getItem('order')) router.push('/')
      } catch (err) {
        console.log(err.message) 
      }

    }
    availableOrder()

    return {
      lang: computed(() => useStore().getters.getLang),
      width,
      progress,
      success,
      error,
      emptyCart,
    };
  },
};
</script>


<style lang="scss" scoped>
.payment-page {
  width: 80%;
  max-height: 100vh;
  margin: 100px auto;
  color: black;

  .payment-info {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;

    h2 {
      font-size: 1.5rem;
    }

    .payment-titles {
      display: flex;
      justify-content: space-between;
    }

    .progress-bar {
      background-color: #22B573;
    }
  }

  form {
    width: 100%;
    max-width: 700px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 25px;
    border-radius: 5px;
    background-color: rgb(241, 241, 241);

    .payment-methods {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0 auto 25px;

      i {
        margin: 0 25px;
        font-size: 3rem;
        color: rgb(78, 78, 78);
      }
    }

    input, label {
      margin-bottom: 10px;
    }

    input {
      padding-left: 10px;
    }

    .cardinfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 15px;

      div {
        width: 49%;
        display: flex;
        flex-direction: column;
      }
    }

    button {
      border: none;
      width: 50%;
      padding: 5px 0;
      border-radius: 5px;
      background-color: #22B573;
      color: white;
      font-weight: 500;
      align-self: center;
    }

    button:hover {
      opacity: 60%;
    }
  }

}
</style>