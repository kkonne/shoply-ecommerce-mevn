<template>
  <div class="product-card">
      {{ product.name }} - €{{ product.price }}
      <button @click="addToCart">Add to cart</button>
      <span>{{ product_quantity }}</span>
  </div>
</template>

<script>

export default {
    name:"ProductCard",

    props: ["product"],

    methods: {
        addToCart(){ // add product to cart vuex 
            this.$store.commit("addToCart", this.product);
        },
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