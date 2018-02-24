import Service from 'easy-requests'
import { API_URL } from 'src/config/api'
import Config from 'src/config' // It will changed to config OAuth

class User extends Service {
  constructor () {
    super()
    this.config.origin = API_URL
    this.config.endpoint = '/users/'
  }

  static async currentUser () {
    let UserService = new User()
    console.log(Config('CURRENT_USER_URL'))
    try {
      let response = await UserService.http.get(Config('CURRENT_USER_URL'))
      return response
    } catch (error) {
      throw error
    }
  }
}

export default User
