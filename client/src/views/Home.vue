<template>
  <div class="home">
    <h1>Home page</h1>

    <ProductCard
    v-for="(item, i) in items"
    :key="i"
    :product="item" />
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard"
import axios from "axios";

export default {
  name: 'Home',

  components: {
    ProductCard,
  },

  data(){
    return {
      items: undefined,
    }
  },

  async created(){
    try {
      const response = await axios.get('api/items/');
      this.items = response.data;
    } catch (error) {
      console.error(error);
    }
  },
}
</script>
