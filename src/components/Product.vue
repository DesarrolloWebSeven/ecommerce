<template>
<div>
    {{product.title}}
    {{product.description}}
    {{product.images[0]}}
    {{product.images[1]}}
    <img :src="product.images[1]" alt="">
    <img :src="product.images[0]">
</div>
  
</template>

<script>
import {reactive} from 'vue'
export default {
    name:'Product',
    props:{
        product:Object
    },
    setup(props){
        let product=reactive(props.product)
        console.log(product)
        return{
            product
        }
    }
}
</script>

<style>

</style>