import Service from 'easy-requests'
import { Fire, Config } from 'helpers'

class User extends Service {
  constructor () {
    super()
    // this.config.origin = Env('BASE_URL')
    this.config.origin = Config('API_URL')
    this.config.endpoint = '/users/'
  }

  static async currentUser () {
    let UserService = new User()
    try {
      let response = await UserService.http.get(Config('CURRENT_USER_URL'))
      Fire('user:fetched', response)
      return response
    } catch (error) {
      throw error
    }
  }
}

export default User
