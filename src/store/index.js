import { createStore } from 'vuex'
import i18next from 'i18next'

export default createStore({
  state: {
    currentLang: i18next.language,
    lang: {},
    total:0,
    products: [],
    cart: {}
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
    },
    setProducts(state, products) {
      state.products = products
    },
    setCart(state, product) {
      state.cart[product._id] = { ...product }
      console.log(state.cart)
    },
    setVaciar(state) {
      state.carrito = {}
    },
  },
  actions: {
    async fetchData({commit}) {
      try {
        const res = await fetch('http://localhost:8081/productos')
        const products = await res.json()
        commit('setProducts', products)
      } catch (error) {
        console.log(error)
      }
    },
    addToCart({ commit, state }, product) {
      
      console.log(5555,  state.cart.hasOwnProperty(product._id));
      state.cart.hasOwnProperty(product._id)
        ? product.quantity = state.cart[product._id].quantity + product.quantity
        : product.quantity = product.quantity
      commit('setCart', product)
    }
  },
  
  modules: {
  }
})
