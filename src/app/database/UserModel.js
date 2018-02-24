import { Model } from 'database/Base.model'
export class UserModel extends Model {
  constructor () {
    super('persons')
  }
}

export const Person = new UserModel()
