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
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    'product-card' : ProductCard
  },
  computed: {
    ...mapGetters(["products", "displayProducts"])
  },
  mounted(){
    this.fetchData();
  },
  data(){
    return {
      // products: [],
      // displayProducts: [],
      currentPage: 1,
      rows: 1,
      perPage: 3
    }
  },
  methods: {
    async fetchData(){
      await this.$store.dispatch("fetchProducts")
      console.log(this.$store.getters.products);
      // const res = await fetch("products.json")
      // const val = await res.json();
      // this.displayProducts = this.products.slice(0, 3);
      this.rows = this.products.length;
      console.log("Home",this.products)
    },
    paginate(currentPage){
      // const start = (currentPage - 1) * this.perPage;
      // this.displayProducts = this.products.slice(start, start + 3);
      this.$store.dispatch("paginate", { currentPage, perPage: this.perPage});
    }
  }
}
</script>
