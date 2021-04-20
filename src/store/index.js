import { createStore } from 'vuex'
import i18next from 'i18next'

export default createStore({
  state: {
    cookie: localStorage.getItem('geeky') || null,
    token: localStorage.getItem('jwt') || null,
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
    },
    getToken(state) {
      return state.token
    },
    getCookie(state) {
      return state.cookie
    },
    totalQuantity(state) {
      return Object.values(state.cart).reduce((acc, {quantity}) => acc + quantity, 0)
    },
    totalPrice(state) {
      return Object.values(state.cart).reduce((acc, {quantity, price}) => acc + quantity * price, 0)
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
    },
    setProducts(state, products) {
      state.products = products
    },
    setCart(state, product) {
      state.cart[product._id] = { ...product }
      console.log(state.cart)
    },
    setVaciar(state) {
      state.cart = {}
    },
    plus(state, product) {
      state.cart[product].quantity = state.cart[product].quantity + 1
    },
    minus(state, product) {
      state.cart[product].quantity = state.cart[product].quantity - 1
      if (state.cart[product].quantity === 0) {
        delete state.cart[product]
      }
    }
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
      commit('setCart', product)},
    setLogin(context, usuario) {
      context.commit('setToken', usuario)
    }
  },
  
  modules: {
  }
})
