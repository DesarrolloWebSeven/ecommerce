<template>

<div v-for="product in products" :key="product.index">
    <Product :product="product" />
</div>
  
</template>

<script>
import Product from '@/components/Product'
import {reactive} from 'vue'
export default {
    name:'Category',
    components:{
        Product
    },
    props:{
        category:String
    },
    setup(props){

        let products=reactive([])
        const listProduct=()=>{
            fetch(`http://localhost:8081/productos/${props.category}`)
            .then(res=>res.json())
            .then(data=>data.forEach(item=>products.push(item)))
            .catch(err=>console.log(err))
        }
        listProduct()        
        
        return{
            products
        }
    }


}
</script>

<style lang="sass" scoped>

</style>