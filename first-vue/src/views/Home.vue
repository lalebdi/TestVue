<template>
  <b-container>
    <b-row align-v="center" >
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
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
}
</script>
