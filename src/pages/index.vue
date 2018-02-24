<template lang="pug">
  q-page.column
    // img(src="~assets/quasar-logo-full.svg")
    div.center(style="text-align:center;padding:24px;")
      q-btn(@click="getCurrentUser") Get user
      pre.bg-black.text-white(style="text-align:left;",v-text="currentUser")
</template>

<style>
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  methods: {
    ...mapActions('users', [ 'getCurrentUser' ])
  },
  computed: {
    ...mapGetters('users', ['currentUser'])
  }
}
</script>
