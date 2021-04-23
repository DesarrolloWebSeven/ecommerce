<template>
<div style="width:80%">
    <h6 v-if="total=>0" class="d-flex justify-content-end">TOTAL:{{(totalPrice).toFixed(2)}}</h6>
</div>
  
  
</template>

<script>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'
export default {
    name:'Total',
    props:{},
    setup(){
        const store= useStore()
        const totalPrice = computed(() => store.getters.totalPrice)        
                
        return{
            totalPrice
        }
    }

}
</script>

