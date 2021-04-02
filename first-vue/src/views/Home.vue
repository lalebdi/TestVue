<template>
  <b-container>
    <b-row align-v="center" >
      <product-card v-for="product in products" :key="product.id" :name="product.name"></product-card>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
// import ProductCard from '@/components/ProductCard.vue'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    'product-card' : ProductCard
  },
  mounted(){
    this.fetchData();
  },
  data(){
    return {
      products: []
    }
  },
  methods: {
    async fetchData(){
      const res = await fetch("products.json")
      const val = await res.json();
      this.products = val;
    }
  }
}
</script>
