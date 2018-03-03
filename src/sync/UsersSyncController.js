import SyncController from './SyncController'
import * as UserService from 'src/services/user.service'
import { User as UserTable } from '@app/database/UserModel.js'
export default class User extends SyncController {
  constructor () {
    super(UserService.default, UserTable)
  }

  routeForCreate () {
    return env('BASE_URL') + 'api/users'
  }
}
