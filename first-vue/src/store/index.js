import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    displayProducts: [],
    rows: 1,
  },
  mutations: {
    SET_PRODUCTS(state, products){
      state.products = products;
    },
    SET_ROWS(state, rows){
      state.rows = rows;
    },
    SET_DISPLAY_PRODUCTS(state, displayProducts){
      state.displayProducts = displayProducts;
    }
  },
  actions: {
    async fetchData(){
      return new Promise(resolve => {
        setTimeout(async () =>{
          const res = await fetch("products.json");
          const val = await res.json();
          resolve(val);
        }, 1000);
      });
    },
    async fetchProducts({ dispatch, commit }){
      const myJson = await dispatch("fetchData")
      commit("SET_PRODUCTS", myJson);
      commit("SET_ROWS", myJson.length);
      const displayProducts = myJson.slice(0, 3);
      commit("SET_DISPLAY_PRODUCTS", displayProducts)
      commit("SET_ROWS", myJson.length);
    },
    async paginate({ commit, state }, { currentPage, perPage }){
      const start = (currentPage - 1) * perPage;
      const products = state.products.slice(start, start + 3);
      commit("SET_DISPLAY_PRODUCTS", products)
    },
    updatePagination({ commit, dispatch }, { myJson, currentPage, perPage }){
      commit("SET_PRODUCTS", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", { currentPage, perPage })
    },
    async search({ dispatch }, { text }){
      const myJson = await this.dispatch("fetchData")
      const values = myJson.filter( val => val.name.toLowerCase().includes(text.toLowerCase()))
      dispatch("updatePagination", { myJson: values, currentPage: 1, perPage: 3 })
    }
  },
  getters: {
    products(state){
      return state.products;
    },
    displayProducts(state){
      return state.displayProducts;
    },
    rows(state){
      return state.rows;
    },
  },
  modules: {},
})
