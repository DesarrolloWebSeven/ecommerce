<template>
  <div><Total /></div>
</template>

<script>
import Total from '@/components/Total'
import { ref, reactive, computed} from "vue";
import {useStore} from 'vuex'

export default {
  name: "CartComponent",
  props: {},
  components: {
    Total
  },
  setup() {
    let store=useStore()

    


    return {
       

    };
  },
};
</script>

<style>

</style>