<template lang="pug">
  q-page.column.index
    // img(src="~assets/quasar-logo-full.svg")
    form.new-user-form(@submit.prevent="createUser")
      q-field.email(
        icon="person"
        label=""
        helper=""
        error-label="We need a valid name"
      )
        q-input(v-model="form.first_name" stack-label="First name")
      q-field.email(
        icon="person"
        label=""
        helper=""
        error-label="We need a valid name"
      )
        q-input(v-model="form.last_name" stack-label="Last name")
      q-field(icon="email"
        label=""
        helper=""
        error-label="We need a valid name")
        q-input(v-model="form.email" type="email")
      .center
        q-btn(type="submit" big class="bg-primary text-white") Add
    div.row.justify-around.center(style="text-align:center;padding:24px;")
      q-btn(@click.native="getCurrentUser") Get current user
      q-btn(@click.native="getUsers") Get users
      q-btn(@click.native="fire") Dispatch event

    div(v-if="currentUser")
      p Current user
      pre.bg-black.text-white(style="margin:24px;text-align:left;", v-text="currentUser")

    div(v-if="users")
      p Users
        pre.bg-black.text-white(style="margin:24px;text-align:left;", v-text="users")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Env, Fire, Listen } from 'helpers'
import { User } from 'src/app/database/UserModel'
import { QInput, QField } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      form: {
        first_name: null,
        last_name: null,
        email: null,
        synced: '0'
      }
    }
  },
  methods: {
    resetForm () {
      this.form = {
        first_name: null,
        last_name: null,
        email: null,
        synced: '0',
        interval: undefined
      }
    },
    async createUser () {
      if (this.validForm) {
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          navigator.serviceWorker.ready
            .then(function (sw) {
              return sw.sync.register('sync-new-user')
            })
        }

        await User.add(this.form)
        this.resetForm()
      }
    },
    fire () {
      const CLIENT_SECRET = Env('CLIENT_SECRET', null)
      Fire('app.custom-event', { CLIENT_SECRET })
    },
    ...mapActions('users', [ 'getCurrentUser', 'getUsers' ])
  },
  computed: {
    validForm () {
      return this.form.first_name && this.form.last_name && this.form.email
    },
    ...mapGetters('users', ['currentUser', 'users'])
  },
  mounted () {
    Listen('app.custom-event', (payload) => {
      console.log('a custom event was dispatched', payload)
    })
  },
  components: { QInput, QField }
}
</script>

<style lang="scss">
  .index{
    .new-user-form {
      padding: 24px;
      max-width: 520px;
      margin: 0 auto;
      .q-field{
        margin-bottom: 1rem;
      }
    }
  }
</style>
