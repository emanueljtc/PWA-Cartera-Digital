export const setCurrentUser = (state, payload) => {
  state.currentUser = payload.data
}

export const setUsersList = (state, payload) => {
  state.users = payload
}
