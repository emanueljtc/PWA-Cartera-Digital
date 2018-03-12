export default {
  oauth: {
    grant_type: 'password',
    client_id: env('CLIENT_ID'),
    client_secret: env('CLIENT_SECRET'),
    scope: '*'
  },
  default_storage: env('DEFAULT_STORAGE', 'LocalStorage'), // Supported Types 'Cookies', 'Localstorage',
  oauth_type: 'Bearer'
}
