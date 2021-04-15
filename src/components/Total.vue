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
        let total=ref(0)

        

       /*  let total=computed(()=>{
            return store.getters.getTotal
            total+=5
        }) */
                
        return{
            total
        }
    }

}
</script>

