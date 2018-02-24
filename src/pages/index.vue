<template lang="pug">
  q-page.column
    // img(src="~assets/quasar-logo-full.svg")
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

<style>
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Env, Fire, Listen } from 'helpers'
export default {
  name: 'PageIndex',
  methods: {
    Env,
    fire () {
      const CLIENT_SECRET = Env('CLIENT_SECRET', null)
      Fire('app.custom-event', { CLIENT_SECRET })
    },
    ...mapActions('users', [ 'getCurrentUser', 'getUsers' ])
  },
  computed: {
    ...mapGetters('users', ['currentUser', 'users'])
  },
  mounted () {
    Listen('app.custom-event', (payload) => {
      console.log('a custom event was dispatched', payload)
    })
  }
}
</script>
