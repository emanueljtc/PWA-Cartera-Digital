import Http from 'axios'
import { Config } from 'helpers'
export default {
  user: null,
  destroySession () {
    this.user = null
  },
  async currentUser () {
    if (this.user) {
      return this.user
    }
    try {
      let user = await Http.get(Config('api.current_user_url'))
      this.user = user
      return user
    } catch (error) {
      return error
    }
  },
  async attemptLogin (credentials) {
    try {
      let response = await Http.post(Config('api.token_url'), credentials)
      return new Promise(resolve => resolve(response))
    } catch (error) {
      return new Promise((resolve, reject) => reject(error))
    }
  },
  addAuthorizationHeader (header) {
    Http.defaults.headers.common['Authorization'] = header
  }
}
