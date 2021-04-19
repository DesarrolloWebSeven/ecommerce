import { createStore } from 'vuex'
import i18next from 'i18next'

export default createStore({
  state: {
    token: localStorage.getItem('jwt') || null,
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
    setToken(state, payload) {
      state.token = payload
    },
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
    setLogin(context, usuario) {
      context.commit('setToken', usuario)
    }
  },
  modules: {
  }
})
