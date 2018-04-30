/*
export const someMutation = (state) => {
}
*/
export const setIngreso = (state, payload) => {
  state.ingreso = payload
}

export const setEgresos = (state, payload) => {
  state.egresos = payload
}

export const setGastos = (state, payload) => {
  state.gastos = payload
}

export const setDeuda = (state, payload) => {
  state.deuda = payload
}

export const setDeudaF = (state, payload) => {
  state.frecuenciaDeuda = payload
}

export const setDeudaC = (state, payload) => {
  state.cantidadDeuda = payload
}

export const setMetaC = (state, payload) => {
  state.cantidadMeta = payload
}

export const setMeta = (state, payload) => {
  state.meta = payload
}
