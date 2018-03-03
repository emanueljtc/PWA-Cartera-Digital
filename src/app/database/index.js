import Dexie from 'dexie'
import { Config } from 'helpers'
// import { debounce } from 'quasar'
import { dispatchToSw } from 'src/app/helpers/sw-dispatcher'

window.disp = dispatchToSw
export class Database extends Dexie {
  constructor () {
    super(Config('database.name'))
    this.version(1).stores(Config('database.entities'))
  }
}
export const DB = new Database()

DB.users.hook('updating', function (modifications, primKey, obj, transaction) {
  // console.log('users updated: ', modifications, primKey, obj, transaction)
  // dispatchToSw(modifications)
})

DB.users.hook('creating', function (primKey, obj, transaction) {
  // console.log('users creating: ', obj, transaction)
  // dispatchToSw(obj)
})

window.DB = DB
