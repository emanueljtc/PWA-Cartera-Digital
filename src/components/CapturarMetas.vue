<template>
  <div class="container metas center-align">
    <div class="content">
      <h2>Metas</h2>
      <p>Indicanos tu meta</p>
      <div class="metas_desglose">
        <div class="cuanto-meta">
          <h2>¿De cuánto?</h2>
          <q-field>
            <vue-autonumeric v-model="form.meta"
                :options="{
                  currencySymbol: '$',
                  decimalPlaces: 2,
                  minimumValue: 0,
                }" placeholder="$0.00"></vue-autonumeric>
          </q-field>
        </div>
        <div class="para-meta">
          <h2>¿Para qué?</h2>
          <q-field>
            <q-input v-model="form.proposito" type="text" placeholder="Ejemplo. Viaje a méxico"/>
          </q-field>
        </div>
      </div>
      <button class="next" @click="sendData()" v-bind:disabled="!isMetaValid">Siguiente <i class="material-icons">arrow_forward</i></button>
    </div>
  </div>
</template>

<script>
import { QField, QInput, QBtn } from 'quasar'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'

export default {
  name: 'Metas',
  data () {
    return {
      form: {
        id: 1,
        meta: null,
        proposito: null
      }
    }
  },
  created () {
    this.$store.dispatch('metas/get', this.form.id)
      .then(item => {
        this.form.id = item.id
        this.form.meta = item.meta
        this.form.proposito = item.proposito
      })
  },
  methods: {
    sendData () {
      this.$store.dispatch('metas/store', this.form)
        .then(item => {
          this.$emit('saved', this.form)
        })
    },
    deleteMeta () {
      this.form = {
        id: 1,
        meta: null,
        proposito: null
      }
    }
  },
  computed: {
    // Validación para ir al siguiente paso
    isMetaValid () {
      return this.form.meta !== null && this.form.proposito !== null
    }
  },
  components: {
    QField, QInput, QBtn, VueAutonumeric
  }
}
</script>

<style>
</style>
