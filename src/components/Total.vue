<template>
<div style="width:80%">
    <h6 v-if="total=>0" class="d-flex justify-content-end">TOTAL:{{total}}</h6>
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

