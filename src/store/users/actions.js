import User from 'services/user.service'
export const getUsers = async ({ commit, state }, payload) => {
  try {
    const users = await User.get()
    commit('users/setUsersList', users, {
      root: true
    })
  } catch (error) {
    throw error
  }
}

export const getCurrentUser = async ({ commit, state }, payload) => {
  if (state.currentUser) return state.currentUser
  let user_promise = User.currentUser() // eslint-disable-line
  user_promise
    .then(user => {
      commit('users/setCurrentUser', user, {
        root: true
      })
    })
    .catch(error => {
      console.log('There was an error :c')
      throw error
    })
}

export const destroyCurrentUser = ({ commit, state }, payload) => {
  commit('users/setCurrentUser', {
    data: null
  }, {
    root: true
  })
}
