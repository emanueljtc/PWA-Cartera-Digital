import Env from 'env'
const API_URL = Env('BASE_URL', 'http://localhost:8000/') + 'api/'
export default {
  API_URL,
  TOKEN_URL: API_URL + 'oauth/token',
  CURRENT_USER_URL: API_URL + 'currentuser',
  endpoints: {
    USERS_URL: API_URL + 'users'
    // resource_url : API_URL + 'resource'
  }
}
