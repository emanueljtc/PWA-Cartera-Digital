import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import ingresos from './ingresos'
import egresos from './egresos'
import gastos from './gastos'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    ingresos,
    egresos,
    gastos
  }
})

export default store
