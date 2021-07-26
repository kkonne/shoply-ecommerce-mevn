import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

let updatePromoCodesLocalStorage = (promocodes) => {
  localStorage.setItem("promoCodes", JSON.stringify(promocodes))
}

export default new Vuex.Store({
  state: {
    cart: [],
    promoCodes: []
  },

  getters: {
    productQuantity: state => product => {
      const item = state.cart.find(item => item._id === product._id)

      if(!item) return;

      return item.quantity;
    },

    cartItems: state => {
      return state.cart
    },

    cartSubtotal: state => {
      let cartSubtotal = state.cart.reduce((a, b) => a + (b.price * b.quantity), 0)

      return cartSubtotal
    },
    
    cartTotal: state => {
      if(!state.promoCodes.length) return
      
      let cartTotal = state.cart.reduce((a, b) => a + (b.price * b.quantity), 0)

      state.promoCodes.forEach(code => {
        if(code.type === "percentage") cartTotal *= (1 - code.value)
        if(code.type === "value") {
          if(cartTotal > code.value){
            cartTotal -= code.value
          } else {
            cartTotal = 0
          }
        }
      })

      return cartTotal
    },

    appliedPromoCodes: state => {
      return state.promoCodes
    }
  },

  mutations: {
    addToCart(state, product) {
      let item = state.cart.find(item => item._id === product._id)

      if(!item) {
        state.cart.push({ ...product, quantity: 1 })
      } else {
        item.quantity++;
      }

      updateLocalStorage(state.cart)
    },

    removeFromCart(state, product) {
      let item = state.cart.find(item => item._id === product._id)

      if(!item) return;

      if(item.quantity > 1){
        item.quantity--;
      }else{
        state.cart = state.cart.filter(item => item._id !== product._id)
      }

      updateLocalStorage(state.cart)
    },

    updateCartFromLocalStorage(state){
      const cart = localStorage.getItem("cart");
      if(!cart) return;

      state.cart = JSON.parse(cart)
    },
    
    applyPromoCode(state, promoCode) {
      state.promoCodes.push({ ...promoCode })
      
      updatePromoCodesLocalStorage(state.promoCodes)
    },
    
    removePromoCode(state, promoCode) {
      let item = state.promoCodes.find(item => item === promoCode)
      
      if(!item) return;
      
      state.promoCodes = state.promoCodes.filter(item => item !== promoCode)
      
      updatePromoCodesLocalStorage(state.promoCodes)
    },
    
    updatePromoCodesFromLocalStorage(state){
      const promocodes = localStorage.getItem("promoCodes");
      if(!promocodes) return;

      state.promoCodes = JSON.parse(promocodes)
    },

    clearCart(state){
      if(!state.cart) return

      state.cart = [];
      
      updateLocalStorage(state.cart);
    },

    clearPromoCodes(state){
      if(!state.promoCodes) return

      state.promoCodes = [];
      
      updatePromoCodesLocalStorage(state.promoCodes);
    }
  },

  actions: {
  },

  modules: {
  }
})