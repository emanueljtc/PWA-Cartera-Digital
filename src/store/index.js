import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import valuador from './valuador'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    valuador
  }
})

export default store
