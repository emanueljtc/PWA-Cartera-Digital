import { build as stateFactory } from '../generic/stateFactory'
import { build as gettersFactory } from '../generic/gettersFactory'
import * as mutations from '../generic/mutations'
import { build as actionsFactory } from '../generic/actionsFactory'

const actions = actionsFactory('ingresos')

const getters = gettersFactory()

const state = stateFactory()

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
