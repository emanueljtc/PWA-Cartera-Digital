import Env from 'env'
export const API_URL = Env('BASE_URL', 'http://localhost:8000/') + 'api/'
export default {
  TOKEN_URL: Env('BASE_URL', 'http://localhost:8000/') + 'oauth/token',
  CURRENT_USER_URL: API_URL + 'currentuser',
  endpoints: {
    USERS_URL: API_URL + 'users'
    // resource_url : API_URL + 'resource'
  }
}
