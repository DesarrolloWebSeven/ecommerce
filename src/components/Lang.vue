<template>
  <div class="d-flex align-items-center">    
    <select class="select" v-model="currentLang">
      <option v-for="(lang,i) in langs" :key="i">
        {{lang}}
      </option>
    </select>
    <label><img alt="banderas" :src="lang.flag"></label>
  </div>
</template>
<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import i18next from 'i18next'
import { useStore } from 'vuex'

export default {
    name:'Lang',
    props:{

    },
    setup(){
      const store=useStore()
      let langs=reactive(i18next.languages)
      let currentLang=ref(i18next.language)
      let lang=computed(()=>{
        let language=i18next.getDataByLanguage(currentLang.value)
        store.commit('setLang',language)
        return language
      })
      watch(currentLang,(current,prev)=>{
        store.commit('setCurrentLang',current)
      })

      return {
        lang,
        langs,
        currentLang
      }
    }
}

</script>

<style lang="scss" scoped>
.select{
  height: 30px;
  margin: 5px;
  
  
}
img{
    height: 40px;
  }

</style>