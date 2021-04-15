import { createStore } from 'vuex'
import i18next from 'i18next'

export default createStore({
  state: {
    currentLang: i18next.language,
    lang: {},
    total:0
  },
  getters: {
    getLang(state){
      return state.lang
    },
    getCurrentLang(state){
      return state.currentLang
    },
    getTotal(state) {
      return state.total
    }
  },
  mutations: {
    setLang(state,lang){
      state.lang=lang
    },
    setCurrentLang(state,value){
      state.currentLang=value
      state.lang=i18next.getDataByLanguage(value)
    },
    setTotal(state, valor){
      state.total=valor
    }
  },
  actions: {
  },
  modules: {
  }
})
