<template>
  <main class="main-content">
    <section class="project-page">
      <h1>Proyecto</h1>
      <div v-html='miHtml'></div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
export default {
    name:'Proyect',
    setup(){
      let miHtml = ref('')

      const projectInfo = async () => {
        
        try {

          let res = await axios.get('/admin/editor/proyecto')
          miHtml.value = res.data[0].content
        
        } catch (err) {
          console.log(err.message)
        }
      }
      projectInfo()
        
    return {
      miHtml,
      lang: computed(()=>useStore().getters.getLang)
    }
  }

}
</script>

<style lang="scss" scoped>
.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-page {
  margin: 120px auto 90px;
  width: 80%;
  color: rgb(99, 98, 98);
  text-align: left;

  h1, h2 {
    margin-bottom: 20px;
    color: black;
  }

  h2.left {
    color: black;
  }

}

</style>