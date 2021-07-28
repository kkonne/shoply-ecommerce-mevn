import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

let updatePromoCodesLocalStorage = (promocodes) => {
  localStorage.setItem("promoCodes", JSON.stringify(promocodes))
}

let calculateItemSubtotal = (item) => {
  let itemSubtotal;

  if(item.name === "Motion Sensor"){
    if(Math.floor(item.quantity / 3) < 1) {
      itemSubtotal = (item.price * item.quantity)
      return itemSubtotal;
    }

    if(Math.floor(item.quantity / 3) >= 1){
      itemSubtotal = (Math.floor(item.quantity / 3) * 65.00) + ((item.quantity % 3) * item.price);
      return itemSubtotal;
    }
  }
  
  if(item.name === "Smoke Sensor"){
    if(Math.floor(item.quantity / 2) < 1) {
      itemSubtotal = (item.price * item.quantity)
      return itemSubtotal;
    }

    if(Math.floor(item.quantity / 2) >= 1){
      itemSubtotal = (Math.floor(item.quantity / 2) * 35.00) + (Math.floor(item.quantity % 2) * item.price);
      return itemSubtotal;
    }
  }

  itemSubtotal = (item.price * item.quantity);

  return itemSubtotal;
};

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
      let cartSubtotal = 0

      state.cart.forEach(item => {
        cartSubtotal += calculateItemSubtotal(item);
      });

      return cartSubtotal
    },
    
    cartTotal: state => {
      
      let cartTotal = 0
      
      state.cart.forEach(item => {
        cartTotal += calculateItemSubtotal(item);
      });
        
      if(!state.promoCodes.length) return cartTotal;

      state.promoCodes.forEach(code => {
        if(code.type === "value") {
          if(cartTotal > code.value){
            cartTotal -= code.value
          } else {
            cartTotal = 0
          }
        }
      });
      
      state.promoCodes.forEach(code => {
        if(code.type === "percentage") cartTotal *= (1 - code.value)
      });

      return cartTotal
    },

    appliedPromoCodes: state => {
      return state.promoCodes
    },

    itemSubtotal: state => product => {
      const item = state.cart.find(item => item._id === product._id)

      if(!item) return;

      return calculateItemSubtotal(item);
    },
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