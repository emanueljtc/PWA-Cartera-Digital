/*
export const someAction = (state) => {
}
*/

export const finish = (store, payload) => {
  const { commit } = store
  commit('valuador/setForm', payload, {
    root: true
  })
}
