import { Model } from 'src/app/database/BaseModel'
export class UserModel extends Model {
  constructor () {
    super('users')
  }
}

export const User = new UserModel()
