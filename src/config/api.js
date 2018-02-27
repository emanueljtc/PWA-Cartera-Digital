import Env from 'env'
const api_url = Env('BASE_URL', 'http://localhost:8000/') + 'api/'
export default {
  api_url,
  token_url: Env('BASE_URL', 'http://localhost:8000/') + 'oauth/token',
  current_user_url: api_url + 'currentuser',
  endpoints: {
    users_url: api_url + 'users'
    // resource_url : api_url + 'resource'
  }
}
