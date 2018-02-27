import SyncController from './SyncController'
import * as UserService from 'src/services/user.service'
import { User as UserTable } from '@app/database/UserModel.js'
import { Env } from 'helpers'
export default class User extends SyncController {
  constructor () {
    super(UserService.default, UserTable)
  }

  routeForCreate () {
    return Env('BASE_URL') + 'api/users'
  }
}
