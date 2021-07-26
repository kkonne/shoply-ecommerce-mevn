<template>
  <div>
      <h4>--- Cart payment ---</h4>

      <h3>Cart subtotal: {{ cartSubtotal.toFixed(2) }}</h3>

      <div class="promo">
        <p>If you have a promo code, you can enter it here:</p>
        
        <input v-model="promoCodeInput" type="text">
        <button @click="applyPromoCode">Apply</button>

        <CartPromoCode 
        v-for="(code, i) in appliedPromoCodes"
        :key="i"
        :promocode="code" />
      </div>



      <h2>Cart total: {{ cartTotal ? cartTotal.toFixed(2) : cartSubtotal.toFixed(2) }}</h2>

      <p>Billing Information: </p>

      <label for="email">Email</label>
      <input v-model="emailInput" type="email" name="email">

      <br>
      
      <label for="address">Address</label>
      <input v-model="addressInput" type="text" name="address">

      <br>
      
      <label for="credit_card">Credit card number</label>
      <input v-model="creditCardInput" type="text" name="credit_card">
    
      <br><br>

      <button @click="attemptCheckout">CHECK OUT</button>

      <div v-if="isCheckoutSuccessful">Payment successful! Redirecting you to order summary!</div>
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
        isCheckoutSuccessful: false,
      }
    },

    methods: {
      applyPromoCode(){ // validate promo code and add to cart vuex
        const promoCodeInputValue = this.promoCodeInput.trim();

        this.promoCodeInput = "";

        if(!promoCodeInputValue) return 

        const validPromo = this.discounts.find(code => code.code === promoCodeInputValue);

        // checking if code is valid
        if(!validPromo) {
          console.log("This code is not valid!");
          return
        }

        // checking if there are no promo codes
        if(!this.appliedPromoCodes.length) {
          // SUCCESS
          this.$store.commit("applyPromoCode", validPromo);

          // this.appliedPromoCodes.push(validPromo);
          console.log(`Successfully applied promo code ${promoCodeInputValue}`);
          return;
        }
          
        // checking if code can be used with other codes
        if(!validPromo.combinable) {
          console.log("This code can't be combined with other promo codes!");
          return
        }

        const isAlreadyUsed = this.appliedPromoCodes.find(code => code.code === promoCodeInputValue);

        // checking if code is already used
        if(isAlreadyUsed){
          console.log("This promo code has already been used!");
          return;
        }

        const isExistingCodeCombinable = this.appliedPromoCodes.find(code => code.combinable === true);

        // checking if other used promo codes are combinable
        if(!isExistingCodeCombinable) {
          console.log("Existing codes can't be combined with this promo code!");
          return
        }

        // SUCCESS
        this.$store.commit("applyPromoCode", validPromo);
        console.log(`Successfully applied promo code ${promoCodeInputValue}`);
      },

      attemptCheckout(){
        const emailInputValue = this.emailInput.trim();
        const addressInputValue = this.addressInput.trim();
        const creditCardInputValue = this.creditCardInput.trim();

        this.emailInput = "";
        this.addressInput = "";
        this.creditCardInput = "";

        if(!emailInputValue || !addressInputValue || !creditCardInputValue) {
          console.log("Error! All fields are required!");
          return
        }

        // validate email via regex
        if (!/\S+@\S+\.\S+/.test(emailInputValue)) {
          console.log("Invalid email!");
          return
        }

        // validate credit card number (between 8 and 19 digits)
        if(creditCardInputValue.length < 8 || creditCardInputValue.length > 19){
          console.log("Invalid credit card number!");
          return
        }
            
        console.log("Payment successful!");

        this.isCheckoutSuccessful = true;
        const el = this;
        setTimeout(() => {
          el.isCheckoutSuccessful = false;
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