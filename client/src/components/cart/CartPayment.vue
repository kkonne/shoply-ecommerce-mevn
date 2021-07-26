<template>
  <div>
      <h4 class="space-sm">--- Cart payment ---</h4>

      <h3 class="space-sm">Cart subtotal: {{ cartSubtotal.toFixed(2) }}</h3>

      <div class="promo">
        <p>If you have a promo code, you can enter it here:</p>
        
        <input v-model="promoCodeInput" type="text" class="space-sm">
        <button @click="applyPromoCode">Apply</button>

        <div v-if="promoSuccess" class="space-md">
          <span class="alert-success">Successfully applied promo code {{ promoSuccess }}</span>
        </div>
        
        <div v-if="promoError" class="space-md">
          <span class="alert-error">{{ promoError }}</span>
        </div>

        <CartPromoCode 
        v-for="(code, i) in appliedPromoCodes"
        :key="i"
        :promocode="code" />
      </div>



      <h2 class="space-md">Cart total: {{ cartTotal ? cartTotal.toFixed(2) : cartSubtotal.toFixed(2) }}</h2>

      <p class="space-sm">Billing Information: </p>

      <label for="email">Email</label>
      <input v-model="emailInput" type="email" name="email">

      <br>
      
      <label for="address">Address</label>
      <input v-model="addressInput" type="text" name="address">

      <br>
      
      <label for="credit_card">Credit card number</label>
      <input v-model="creditCardInput" type="text" name="credit_card">
    
      <br><br>

      <button @click="attemptCheckout" class="class-sm">CHECK OUT</button>

      <div v-if="checkoutSuccess" class="space-md">
        <span class="alert-success">Payment successful! Redirecting you to order summary!</span>
      </div>
      
      <div v-if="checkoutError" class="space-md">
        <span class="alert-error">{{ checkoutError }}</span>
      </div>
  </div>
</template>

<script>
import CartPromoCode from "@/components/cart/CartPromoCode.vue"

export default {
    name: "CartPayment",

    components: {
      CartPromoCode
    },

    data(){
      return {
        discounts: [
          {
            code: "20%OFF",
            type: "percentage",
            value: 0.2,
            combinable: false
          },
          {
            code: "5%OFF",
            type: "percentage",
            value: 0.05,
            combinable: true
          },
          {
            code: "20EUROFF",
            type: "value",
            value: 20,
            combinable: true
          }
        ],
        promoCodeInput: "",
        emailInput: "",
        addressInput: "",
        creditCardInput: "",
        promoError: null,
        promoSuccess: null,
        checkoutSuccess: null,
        checkoutError: null,
      }
    },

    methods: {
      applyPromoCode(){ // validate promo code and add to cart vuex
        const promoCodeInputValue = this.promoCodeInput.trim();

        this.promoCodeInput = "";

        if(!promoCodeInputValue) {
          this.promoSuccess = null;
          this.promoError = `Error! Invalid code input!`
          return
        } 

        const validPromo = this.discounts.find(code => code.code === promoCodeInputValue);

        // checking if code is valid
        if(!validPromo) {
          this.promoSuccess = null;
          this.promoError = `Error! Code ${promoCodeInputValue} is not valid!`
          return
        }

        // checking if there are no promo codes
        if(!this.appliedPromoCodes.length) {
          // SUCCESS
          this.$store.commit("applyPromoCode", validPromo);
          this.promoError = null;
          this.promoSuccess = validPromo.code;
          return;
        }
          
        // checking if code can be used with other codes
        if(!validPromo.combinable) {
          this.promoSuccess = null;
          this.promoError = `Error! Code ${promoCodeInputValue} cannot be combined with other promo codes!`
          return
        }

        const isAlreadyUsed = this.appliedPromoCodes.find(code => code.code === promoCodeInputValue);

        // checking if code is already used
        if(isAlreadyUsed){
          this.promoSuccess = null;
          this.promoError = `Error! Code ${promoCodeInputValue} has already been used!`
          return;
        }

        const isExistingCodeCombinable = this.appliedPromoCodes.find(code => code.combinable === true);

        // checking if other used promo codes are combinable
        if(!isExistingCodeCombinable) {
          this.promoSuccess = null;
          this.promoError = `Error! Existing codes can't be combined with this promo code!`
          return
        }

        // SUCCESS
        this.$store.commit("applyPromoCode", validPromo);
        this.promoSuccess = validPromo.code;
      },

      attemptCheckout(){
        const emailInputValue = this.emailInput.trim();
        const addressInputValue = this.addressInput.trim();
        const creditCardInputValue = this.creditCardInput.trim();

        this.emailInput = "";
        this.addressInput = "";
        this.creditCardInput = "";

        if(!emailInputValue || !addressInputValue || !creditCardInputValue) {
          this.checkoutSuccess = null;
          this.checkoutError = `Error! All fields are required!`
          return
        }

        // validate email via regex
        if (!/\S+@\S+\.\S+/.test(emailInputValue)) {
          this.checkoutSuccess = null;
          this.checkoutError = `Error! Invalid email!`
          return
        }

        // validate credit card number (between 8 and 19 digits)
        if(creditCardInputValue.length < 8 || creditCardInputValue.length > 19){
          this.checkoutSuccess = null;
          this.checkoutError = `Error! Invalid credit card number! (8-19 characters)`
          return
        }

        this.checkoutError = null;
        this.checkoutSuccess = true;
        const el = this;
        setTimeout(() => {
          el.checkoutSuccess = false;
          el.$router.push('/order-summary')
        }, 3000);
      },
    },

    computed: {
      cartSubtotal(){
          return this.$store.getters.cartSubtotal
      },
      
      cartTotal(){
          return this.$store.getters.cartTotal
      },

      appliedPromoCodes(){
          return this.$store.getters.appliedPromoCodes
      }
    }
}
</script>

<style>

</style>