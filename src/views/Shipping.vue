<template>
  <div class="container section">
    <div class="row d-flex justify-content-center">
      <ol id="progress-bar">
        <li class="step-active">Envío</li>
        <li class="step-todo">Resumen</li>
        <li class="step-todo">Pago</li>
      </ol>
    </div>
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
              <button @click="saveUser" class="btn btn-success continuar m-2">Continuar</button>
            </p></router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: "Shipping",
  props: {},
  setup() {
    let user = reactive({
      firstName:"",
      lastName:"",
      adress:"",
      flat:"",
      postalCode:"",
      city:"",
      province:"",
      country:"",
      tel:"",
      email:""
    })
    
    const saveUser = () => {      
    localStorage.setItem('UserInfo', JSON.stringify(user))      
    };

    

    
    

    return {      
      saveUser,
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
</style>