<template>

<h1>Pago de la compra</h1>
  
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  name:'Payment',
  setup(){ 
    const router = useRouter()

    const userAuth = async () => {

      try {
        const res = await axios.get('usuario/permiso', {
          headers: { Authorization: "Bearer " + localStorage.getItem('jwt')}
        })
        if(res.data.message === 'fail') router.push('/')
      } catch (err) {
        console.log(err)
      }

    }
    userAuth()
  }
}
</script>

<style lang="scss" scoped>
body {
  color: black;
}
</style>