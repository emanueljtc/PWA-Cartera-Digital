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
        }" :placeholder="reloadIngreso()"></vue-autonumeric>
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
        ingreso: null,
        reloadIngreso: 0
      }
    }
  },
  props: {
    ingresoId: 0
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
    },
    loadItem () {
      if (this.ingresoId > 0) {
        this.$store.dispatch('ingresos/get', this.ingresoId)
          .then(item => {
            this.form.id = item.id
            this.form.ingreso = item.ingreso
          })
      }
    },
    reloadIngreso () {
      if (this.ingresoId > 0) {
        this.$store.dispatch('ingresos/get', this.ingresoId)
          .then(item => {
            this.form.reloadIngreso = item.ingreso
          })
      }
      let value = this.form.reloadIngreso
      let num = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return num
    }
  },
  watch: {
    itemId: (oldVal, newVal) => {
      if (newVal > 0) {
        this.loadItem()
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
