/*
export const someAction = (state) => {
}
*/
export const ingreso = (store, payload) => {
  const { commit } = store
  commit('valuador/setIngreso', payload, {
    root: true
  })
}

export const egresos = (store, payload) => {
  const { commit } = store
  commit('valuador/setEgresos', payload, {
    root: true
  })
}

export const gastos = (store, payload) => {
  const { commit } = store
  commit('valuador/setGastos', payload, {
    root: true
  })
}

export const deuda = (store, payload) => {
  const { commit } = store
  commit('valuador/setDeuda', payload, {
    root: true
  })
}

export const frecuenciaDeuda = (store, payload) => {
  const { commit } = store
  commit('valuador/setDeudaF', payload, {
    root: true
  })
}

export const cantidadDeuda = (store, payload) => {
  const { commit } = store
  commit('valuador/setDeudaC', payload, {
    root: true
  })
}

export const cantidadMeta = (store, payload) => {
  const { commit } = store
  commit('valuador/setMetaC', payload, {
    root: true
  })
}

export const meta = (store, payload) => {
  const { commit } = store
  commit('valuador/setMeta', payload, {
    root: true
  })
}
