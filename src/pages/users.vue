<template lang="pug">
  q-page(padding)
    pre {{users}}
</template>

<script>
import { User } from '@app/database/UserModel'
import { Listen } from 'helpers'
export default {
  name: 'PageUsers',
  data () {
    return {
      users: undefined
    }
  },
  mounted () {
    this.getUsers()
    const vm = this
    Listen('dbusers:list-updated', () => {
      vm.getUsers()
    })

    this.interval = setInterval(async () => {
      await this.getUsers()
    }, 3000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    async getUsers () {
      this.users = await User.getAll()
    }
  }
}
</script>

<style lang="scss">
</style>
