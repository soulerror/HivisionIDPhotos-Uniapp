import Vue from 'vue'
import Vuex from 'vuex'
import Photo from './modules/photo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Photo
  }
})

export default store