<template>
    <div>
        <p>
            <small>{{ promocode.code }}</small>
            <button @click="removeFromCart">Remove</button>
        </p>
    </div>
</template>

<script>

export default {
    name: "CartPromoCode",

    props: ['promocode'],

    methods: {
        removeFromCart(){ // remove promo code from cart vuex
            this.$store.commit("removePromoCode", this.promocode);
        }
    },
}
</script>

<style lang="scss">
</style>