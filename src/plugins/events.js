import { EventEmitter } from 'events'
import UserEventHandler from 'events/handlers/UserEventHandler'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$event = EventEmitter
  // Add event handler for a module
  new UserEventHandler() // eslint-disable-line
}
