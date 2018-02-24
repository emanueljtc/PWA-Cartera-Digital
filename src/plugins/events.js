import { AppEvent } from 'app-events'
import UserEventListener from 'src/app/listeners/UserEventListener'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$event = AppEvent
  // Add event handler for a module
  new UserEventListener() // eslint-disable-line
}
