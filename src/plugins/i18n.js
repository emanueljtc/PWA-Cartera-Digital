import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import Env from 'env'

export default ({ app, store, Vue }) => {
  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: Env('LOCALE', 'en'),
    fallbackLocale: 'en',
    messages
  })
}
