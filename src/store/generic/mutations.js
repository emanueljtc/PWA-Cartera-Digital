export const add = (state, payload) => {
  if (state.collection.findIndex(itemId => itemId === payload.id) === -1) {
    state._collection[payload.id] = payload
    state.collection.push(payload.id)
  }
}
export const update = (state, payload) => {
  state._collection = { ...state._collection, [payload.id]: payload }
}
