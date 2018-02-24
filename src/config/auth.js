import Env from 'env'
window.env = Env
export default {
  oauth: {
    grant_type: 'password',
    client_id: Env('CLIENT_ID'),
    client_secret: Env('CLIENT_SECRET'),
    scope: '*'
  },
  default_storage: Env('DEFAULT_STORAGE', 'LocalStorage'), // Supported Types 'Cookies', 'Localstorage',
  oauth_type: 'Bearer'
}
