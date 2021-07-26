<template>
  <div>
      <h1>Cart</h1>

        <div v-if="items.length">
            <CartProductCard
            v-for="(item, i) in items"
            :key="i"
            :product="item" />


            <CartPayment />
        </div>
        
        <div v-else>
            <p>Your cart is empty! Add items to your cart and you'll see them here.</p>
        </div>
  </div>
</template>

<script>
import CartProductCard from "../components/cart/CartProductCard"
import CartPayment from "../components/cart/CartPayment"

export default {
    name: "Cart",

    components: {
        CartProductCard,
        CartPayment
    },

    computed: {
        items(){
            return this.$store.getters.cartItems
        },
    }
}
</script>

<style>

</style>