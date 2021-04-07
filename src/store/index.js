import { createStore } from 'vuex'
import i18next from 'i18next'

export default createStore({
  state: {
    currentLang: i18next.language,
    lang: {}
  },
  getters: {
    getLang(state){
      return state.lang
    },
    getCurrentLang(state){
      return state.currentLang
    }
  },
  mutations: {
    setLang(state,lang){
      state.lang=lang
    },
    setCurrentLang(state,value){
      state.currentLang=value
      state.lang=i18next.getDataByLanguage(value)
    }
  },
  actions: {
  },
  modules: {
  }
})
