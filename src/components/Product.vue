<template> 

  <div class="container">
    <div class="row">
        <div class="col-12 mt-3">
            <div class="card">
                <div class="card-horizontal">
                    <div class="img-square-wrapper">
                        <img :src="product.images[0]" />
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">{{ product.title }}</h4>
                        <p class="card-text">Stock: {{ product.quantity }}</p>
                        <p class="card-text price">{{ product.price }} €</p>
                        <p class="card-text"><button>COMPRAR</button></p>
                    </div>
                </div>
        
            </div>
        </div>
    </div>
</div>

  
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Product",
  props: {
    product: Object,
  },
  setup(props) {
    let product = reactive(props.product);
    console.log(product);
    return {
      product,
    };
  },
};
</script>

<style lang="scss" scoped>
.card{
    border:none;
    margin: 20px;
    .card-horizontal {
    display: flex;
    flex: 1 1 auto;
    color:black;    
    border-left: 8px solid black;
    border-bottom: 8px solid black;
    .card-title{
        text-transform: uppercase;
        font-weight: bold;
    }
    .card-body{
        display: flex;
        flex-direction: column;
        align-items: center;
        .price{
            background-color: #0f606b;
            padding: 5px;
            color:white;
        }
    }
    img{
    width: 200px;
    height: 200px;
    background-color: white;
    margin: 5px;
  }
    button{
        color:#fff;
        background-color: black;
        padding: 10px;
    }
}

}




</style>