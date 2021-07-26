<template>
  <div class="product-card">
      <span>{{ product_quantity }}x</span>
      {{ product.name }} - €{{ product.price }}
      <button @click="removeFromCart">Delete</button>
  </div>
</template>

<script>

export default {
    name:"ProductCard",

    props: ["product"],

    methods: {
        removeFromCart(){ // remove item from cart vuex
            this.$store.commit("removeFromCart", this.product);
        }
    },

    computed: {
        product_quantity(){
            return this.$store.getters.productQuantity(this.product)
        }
    },
}
</script>

<style lang="scss">
.product-card {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>