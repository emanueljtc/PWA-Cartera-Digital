
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        name: 'app.home',
        component: () => import('pages/index'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/users',
        name: 'app.dbusers',
        component: () => import('pages/users'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'app.login',
    component: () => import('pages/Login'),
    meta: {
      requiresAuth: false
    }
    // children: [{ path: ', component: () => import('pages/index') }]
  },

  {
    // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
