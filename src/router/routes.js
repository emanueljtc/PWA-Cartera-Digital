
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
          requiresAuth: false
        }
      },
      {
        path: '/users',
        name: 'app.dbusers',
        component: () => import('pages/users'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/pasos',
        name: 'app.pasos',
        component: () => import('pages/pasos'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/metas',
        name: 'app.metas',
        component: () => import('pages/metas'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/correo',
        name: 'app.correo',
        component: () => import('pages/correo'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/gastos',
        name: 'app.gastos',
        component: () => import('pages/gastos-mayor'),
        meta: {
          requiresAuth: false
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
