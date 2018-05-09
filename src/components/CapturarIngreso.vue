<template>
  <div class="container valign-wrapper ingresos">
    <div class="content">
      <h2>Ingresos</h2>
      <p>Especifica tus ingresos mensuales</p>
      <q-field>
        <vue-autonumeric v-model="form.ingreso"
        :options="{
        currencySymbol: '$',
        minimumValue: 0,
        }" placeholder="$0.00"></vue-autonumeric>
      </q-field>
      <button class="next" @click="next()" v-bind:disabled="!isIngresoValid">Siguiente <i class="material-icons">arrow_forward</i></button>
   </div>
  </div>
</template>

<script>
import { QField, QInput, QBtn } from 'quasar'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'
export default {
  name: 'Ingresos',
  data () {
    return {
      form: {
        id: 1,
        ingreso: null
      }
    }
  },
  props: {
    ingresoId: 0
  },
  created () {
    this.$store.dispatch('ingresos/get', this.form.id)
      .then(item => {
        this.form.id = item.id
        this.form.ingreso = item.ingreso
      })
  },
  methods: {
    next () {
      if (this.form.ingreso !== null) {
        this.$store.dispatch('ingresos/store', this.form)
          .then(item => {
            this.$emit('saved', this.form)
          })
      } else {
        this.$emit('saved')
      }
    }
  },
  computed: {
    isIngresoValid () {
      if (this.form.reloadIngreso === 0) {
        return this.form.ingreso !== null
      } else {
        return this.form.reloadIngreso !== 0
      }
    }
  },
  components: {
    QField, QInput, QBtn, VueAutonumeric
  }
}
</script>

<style>
</style>
