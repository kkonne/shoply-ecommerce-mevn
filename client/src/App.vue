<template>
  <div id="app">

    <div id="nav" v-if="$route.meta.requiresNav">
      <router-link to="/">Home</router-link> |
      <router-link to="/cart">Cart</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <router-view class="main"/>

    <Footer v-if="$route.meta.requiresNav"/>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue"

export default {
  components: {
    Footer
  },

  mounted(){
    this.$store.commit("updateCartFromLocalStorage");
    this.$store.commit("updatePromoCodesFromLocalStorage");
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main {
  min-height: 90vh;
  width: 85%;
  margin: 30px auto;
}

.alert-error {
  color: rgb(105, 0, 0);
  background-color: rgb(255, 172, 172);
  border: 1px solid rgb(105, 0, 0);
  padding: 1rem;
  width: 100%;
}

.alert-success {
  color: rgb(25, 131, 3);
  background-color: rgb(206, 255, 209);
  border: 1px solid rgb(25, 131, 3);
  padding: 1rem;
  width: 100%;
}

.space-md {
  margin: 3rem 0;
}

.space-sm {
  margin: 1rem 0;
}
</style>
