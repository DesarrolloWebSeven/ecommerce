import { createStore } from 'vuex'
import i18next from 'i18next'

export default createStore({
  state: {
    token: localStorage.getItem('jwt') || null,
    currentLang: i18next.lng,
    lang: {},
    total:0,
    products: [],
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
  },
  getters: {
    getLang(state){      
      return state.lang
    },
    getCurrentLang(state){
      console.log(state.currentLang)
      return state.currentLang || 'es'
    },
    getToken(state) {
      return state.token
    },
    totalQuantity(state) {
      return Object.values(state.cart).reduce((acc, {items}) => acc + items, 0)
    },
    totalPrice(state) {
      return Object.values(state.cart).reduce((acc, {items, price}) => acc + items * price, 0)
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
      
    },
    setEmptyCart(state) {
      state.cart = {}
    },
    setDeleteProduct(state, _id) {
      delete state.cart[_id]
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
      state.cart.hasOwnProperty(product._id)
        ? product.items = state.cart[product._id].items + product.items
        : product.items = product.items
      commit('setCart', product),      
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
      
    setLogin(context, usuario) {
      context.commit('setToken', usuario)
    }
  },
  /* created: function(){
    let infoCart= JSON.parse(localStorage.getItem('cart'))
    if(infoCart === null){
      this.items = []
    } else{
      this.items = infoDB
    }
    console.log(infoCart)
  }, */
  
  modules: {
  }
})
