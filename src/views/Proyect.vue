<template>
  <div>
    <label>{{lang["lang-label"]}}</label>
    <div class="content" v-html='miHtml'></div>
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
.content{
  color: #000;
  text-align: left;
  font-family: "Montserrat", "Game", Helvetica, Arial, sans-serif;
  margin-block: 15px;
  padding-left: 30px;
  padding-right: 30px;
}
</style>