<template>
  <div>
    <h1>Your order</h1>

    <h3>You can check out your order summary:</h3>

    <table style="text-align: left; margin: 0 auto;">
      <tr>
        <th style="padding: .5rem">Item name</th>
        <th style="padding: .5rem">Price</th>
        <th style="padding: .5rem">Quantity</th>
        <th style="padding: .5rem">Total price</th>
      </tr>
      <tr v-for="(item, i) in items" :key="i">
        <td style="padding: .5rem">{{ item.name }}</td>
        <td style="padding: .5rem">{{ item.price }}</td>
        <td style="padding: .5rem">{{ item.quantity }}</td>
        <td style="padding: .5rem">{{ (item.quantity * item.price).toFixed(2) }}</td>
      </tr>
      <br>
      <tr>
        <td style="padding: .5rem">Subtotal</td>
        <td style="padding: .5rem"></td>
        <td style="padding: .5rem"></td>
        <td style="padding: .5rem">{{ cartSubtotal.toFixed(2) }}</td>
      </tr>
      <tr>
        <td style="padding: .5rem">Total</td>
        <td style="padding: .5rem"></td>
        <td style="padding: .5rem"></td>
        <td style="padding: .5rem">{{ cartTotal ? cartTotal.toFixed(2) : cartSubtotal.toFixed(2) }}</td>
      </tr>
    </table>

    <br><br>
    
    <button @click="finishOrder">Countinue shopping</button>
  </div>
</template>

<script>
export default {
    name: "OrderSumamry",

    methods: {
      finishOrder(){
        this.$store.commit("clearCart");
        this.$store.commit("clearPromoCodes");
        this.$router.push('/');
      }
    },

    computed: {
        items(){
          return this.$store.getters.cartItems
        },

        cartSubtotal(){
          return this.$store.getters.cartSubtotal
        },
        
        cartTotal(){
          return this.$store.getters.cartTotal
        },
    }
}
</script>

<style>

</style>