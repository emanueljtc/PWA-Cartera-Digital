import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import ingresos from './ingresos'
import egresos from './egresos'
import gastos from './gastos'
import deuda from './deuda'
import metas from './metas'
import capital from './capital'
import ahorro from './ahorro'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    ingresos,
    egresos,
    gastos,
    deuda,
    metas,
    capital,
    ahorro
  }
})

export default store
