import axios from 'axios'
import Services from 'services'
export default ({ Vue }) => {
  Vue.prototype.$axios = axios
  Services.run()
}
