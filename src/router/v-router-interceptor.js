import { Authenticated } from './middlewares/authenticated'

export default {
  handle (router) {
    router.beforeEach((to, from, next) => {
      // If visiting login view but you already have logged in, you should not be able to see this view
      Authenticated({ to, from, next })
    })
  }
}
