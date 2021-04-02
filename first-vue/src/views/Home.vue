<template>
  <b-container>
    <b-row align-v="center" >
      <product-card v-for="product in displayProducts" :key="product.id" :name="product.name"></product-card>
    </b-row>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="paginate(currentPage)"
    ></b-pagination>
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
      products: [],
      displayProducts: [],
      currentPage: 1,
      rows: 1,
      perPage: 3
    }
  },
  methods: {
    async fetchData(){
      const res = await fetch("products.json")
      const val = await res.json();
      this.products = val;
      this.displayProducts = val.slice(0, 3);
      this.rows = this.products.length;
    },
    paginate(currentPage){
      const start = (currentPage - 1) * this.perPage;
      this.displayProducts = this.products.slice(start, start + 3);
    }
  }
}
</script>
