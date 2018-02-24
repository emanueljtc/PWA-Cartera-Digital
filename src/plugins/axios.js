import axios from 'axios'
import Services from 'services'
// import env from 'env'
export default ({ Vue }) => {
  Vue.prototype.$axios = axios
  Services.run()
}
