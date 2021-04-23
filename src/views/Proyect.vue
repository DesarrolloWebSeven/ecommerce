<template>
  <h1>Esta es la página de  descripción del proyecto</h1>
  <label>{{lang["lang-label"]}}</label>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
export default {
    name:'Proyect',
    setup(){
      // console.log("Ya cargo mi pagina")
      //   let content=reactive({
      //     title:null,
      //     content:""
      //   })
      //   window.onload=()=>{
      //     fetch(`http://localhost:8081/admin/project`)
      //       .then((res) => res.json())
      //       .then((data) =>{
      //         console.log(data)
      //       })
      //       .catch((err) => console.log(err))
      //   }

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>