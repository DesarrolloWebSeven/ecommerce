<template>
  <div v-for="(id, i) in Object.keys(cart)" :key="i" class="item">
    <div class="item-photo">
      <img :src="'/images/'+cart[id].images[0]" />
    </div>
    <div class="item-data">
      <h2>{{ cart[id].title }}</h2>
      <p>{{ (cart[id].description).slice(0,90) + ' (...)' }}</p>
    </div>
    <div class="item-price">
      <p>{{ (cart[id].items * cart[id].price).toFixed(2) }} €</p>
    </div>
    <div class="item-quantity">
      <button :class="{disabledButton2: cart[id].items==1}" @click="cart[id].items>0 ?cart[id].items-- :null">
        <i class="fas fa-minus"></i>
      </button>
      <div><p>{{cart[id].items}}</p></div>
      <button :class="{disabledButton: cart[id].quantity==cart[id].items}" @click="cart[id].items<cart[id].quantity ?cart[id].items++ :null">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="item-delete">
      <i @click="deleteProduct(id)" class="fas fa-trash-alt"></i>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CartComponent",
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart);
    const deleteProduct = (_id) => {store.commit('setDeleteProduct', _id)}

    return {
      cart,
      deleteProduct
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  min-height: 125px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: rgb(247, 244, 244);

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 650px) {
  .item {
    justify-content: space-around;
    flex-direction: column;
    padding: 5px 10px;

    >div {
      margin: 5px;
    }
  }
}

.item-photo {
  width: 15%;
  padding: 10px;

    img {
      max-width: 100%;
    }
}

@media (max-width: 650px) {
  .item-photo {
    width: 50%;
  }
}

  .item-data {
    width: 50%;
    padding: 5px;
    flex-direction: column;
    align-items: flex-start;

    h2 {
      font-size: 0.9rem;
      font-weight: 600;
      color: black;
    }

    p {
      font-size: 0.8rem;
      text-align: justify;
      margin: 0;
    }
  }

  @media (max-width: 650px) {
  .item-data {
    width: 100%;
    align-items: center;

    h2 {
      margin: 0;
    }
    p {
      display: none;
    }
  }
  }

  .item-price {
    width: 15%;
    font-size: 1.1rem;
    font-weight: 700;
    color: black;

    p {
      margin: 0;
    }
  
  }

@media (max-width: 650px) {
  .item-price {
    width: 50%;
  }
}

  .item-quantity {
    width: 10%;
    justify-content: space-between;
    align-items: stretch;
    border: 1px solid gray;

    button {
      width: 30%;
      border: none;
      background-color: gray;
      padding: 2px;
    }
    i {
      color: white;
    }

    div {
      
      p {
        margin: 0;
        padding: 0;
        font-weight: 600;
      }
    }
  }

@media (max-width: 650px) {
  .item-quantity {
    width: 40%;
  }
}
  
  .item-delete {
    width: 10%;
    
    i {
      padding: 7px;
      background-color: rgb(255, 107, 107);
      border-radius: 50%;
      font-size: 0.9rem;
      color: white;
    }
  }

</style>