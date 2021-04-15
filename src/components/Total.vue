<template>

  <h3 v-if="total=>0">TOTAL:{{total}}</h3>
  
</template>

<script>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'
export default {
    name:'Total',
    props:{},
    setup(){
        const store= useStore()
        let total=computed(()=>{
            return store.getters.getTotal
        })
        console.log("TOTAL", total)
        
        return{
            total
        }
    }

}
</script>

