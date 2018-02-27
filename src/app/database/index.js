import Dexie from 'dexie'
import { Config } from 'helpers'
// import { debounce } from 'quasar'
import { dispatchToSw } from 'src/app/helpers/sw-dispatcher'

window.disp = dispatchToSw
console.log(window.disp)
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
  // You may use transaction to do additional database operations.
  // You may not do any modifications on any of the given arguments.
  // You may set this.onsuccess = callback when update operation completes.
  // You may set this.onerror = callback if update operation fails.
  // If you want to make additional modifications,
  // return another modifications object
  // containing the additional or overridden modifications to make. Any returned
  // object will be merged to the given modifications object.
})

DB.users.hook('creating', function (primKey, obj, transaction) {
  // console.log('users creating: ', obj, transaction)
  // dispatchToSw(obj)
  // You may do additional database operations using given transaction object.
  // You may also modify given obj
  // You may set this.onsuccess = function (primKey){}. Called when autoincremented key is known.
  // You may set this.onerror = callback if create operation fails.
  // If returning any value other than undefined, the returned value will be used as primary key
})

window.DB = DB
