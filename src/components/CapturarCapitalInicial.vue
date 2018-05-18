<template>
  <div class="container capital center-align">
    <div class="content">
      <h2>Capital Inicial</h2>
      <p>¿Tienes un ahorro inicial?</p>
      <div class="input-field center-align">
        <q-btn
          @click="capitalExist = true, clickedCapital = true, form.exist = true"
          label="Si"
        />
       <q-btn
          @click="capitalExist = false, clickedCapital = true, deleteCapital()"
          label="No"
        />
      </div>
      <div class="metas_desglose" v-if="form.exist">
        <div class="cuanto-meta">
          <h2>¿Con cuánto guardadito comenzarías?</h2>
          <q-field>
            <vue-autonumeric v-model="form.capitalInicial"
                :options="{
                  currencySymbol: '$',
                  decimalPlaces: 2,
                  minimumValue: 0,
                }" placeholder="$0.00"></vue-autonumeric>
          </q-field>
        </div>
      </div>
      <button class="next" @click="sendData()" v-bind:disabled="!isCapitalValid">Ver resultados</button>
    </div>
  </div>
</template>

<script>
import { QField, QInput, QBtn } from 'quasar'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'

export default {
  name: 'CapitalInicial',
  data () {
    return {
      form: {
        id: 1,
        exist: null,
        capitalInicial: null
      },
      capitalExist: false,
      clickedCapital: false
    }
  },
  created () {
    this.$store.dispatch('capital/get', this.form.id)
      .then(item => {
        this.form.id = item.id
        this.form.exist = item.exist
        this.form.capitalInicial = item.capitalInicial
      })
  },
  methods: {
    sendData () {
      this.$store.dispatch('capital/store', this.form)
        .then(item => {
          this.$emit('saved', this.form)
        })
    },
    deleteCapital () {
      this.form = {
        id: 1,
        exist: false,
        capitalInicial: null
      }
    }
  },
  computed: {
    // Validación para ir al siguiente paso
    isCapitalValid () {
      if (this.form.exist !== null) {
        return this.form.exist !== null
      } else {
        if (this.clickedMeta !== false) {
          if (this.metaExist !== true) {
            return this.clickedMeta !== false
          } else {
            return this.form.meta !== null && this.form.proposito !== null
          }
        }
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
