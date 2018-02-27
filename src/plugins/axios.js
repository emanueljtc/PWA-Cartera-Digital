import axios from 'axios'
import Services from 'services'

import UserSyncController from 'src/sync/UsersSyncController'
window.User = new UserSyncController()
window.axios = axios
console.log(window.User)
// import env from 'env'
export default ({ Vue }) => {
  Vue.prototype.$axios = axios
  Services.run()
}
