import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import valuador from './valuador'
import ingresos from './ingresos'
import egresos from './egresos'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    valuador,
    ingresos,
    egresos
  }
})

export default store
