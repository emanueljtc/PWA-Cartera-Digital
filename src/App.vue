<template lang="pug">
  div#q-app
    router-view
    q-ajax-bar
</template>

<script>
import { QAjaxBar } from 'quasar'
export default {
  name: 'App',
  components: {
    QAjaxBar
  }
}
</script>

<style>
</style>
