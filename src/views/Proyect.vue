<template>
  <div>
    <label>{{lang["lang-label"]}}</label>
    <div class="color" v-html='miHtml'></div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
export default {
    name:'Proyect',
    setup(){
      let miHtml = ref('')

        fetch(`http://localhost:8081/admin/editor/proyecto`)
          .then((res) => res.json())
          .then((data) =>{
            miHtml.value=data[0].content
          })
          .catch((err) => console.log(err))
        
    return {
      miHtml,
      lang: computed(()=>useStore().getters.getLang)
    }
  }

}
</script>

<style lang="scss" scoped>
.color{
  background-color: aquamarine;
}
</style>