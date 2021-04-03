import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const options = {
  method: 'GET',
  url: 'https://api.stifirestop.com/products',
  params: {page: '1', limit: '10'}
};

export default new Vuex.Store({
  state: {
    products: [],
    displayProducts: [],
    rows: 1,
    showSpinner: false
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
    },
    SET_SPINNER(state, spinner){
      state.showSpinner = spinner;
    }
  },
  actions: {
    async fetchData({ commit }){
      commit("SET_SPINNER", true)
      return new Promise(resolve => {
        axios.request(options).then(function (response) {
          console.log("response= ",response.data.data);
          const val = response.data.data;
          resolve(val)
        }).catch(function (error) {
          console.error(error);
        })
        // commit("SET_SPINNER", false);
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
      const values = myJson.filter( val => val.name.toLowerCase().includes(text.toLowerCase())) // change this to a server side search.
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
    showSpinner(state){
      return state.showSpinner;
    },
  },
  modules: {},
})
