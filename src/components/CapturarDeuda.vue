<template>
  <div class="container valign-wrapper deuda">
    <div class="content">
      <h2>¿Tienes una deuda?</h2>
      <p>Especifica tu deuda</p>
      <div class="input-field center-align">
        <q-btn
          @click="deudaExist = true, clickedDeuda = true, form.exist = true"
          label="Si"
        />
        <q-btn
          @click="deudaExist = false, clickedDeuda = true, form.exist = false"
          label="No"
        />
      </div>
      <div class="deuda_desglose" v-if="deudaExist">
        <h2>¿De cuánto?</h2>
        <q-field>
          <vue-autonumeric v-model="form.deuda"
            :options="{
              currencySymbol: '$',
              decimalPlaces: 2,
              minimumValue: 0,
            }" placeholder="$0.00"></vue-autonumeric>
        </q-field>
        <div class="input-field center-align">
          <div class="row-m">
            <div class="period">
              <p>Frecuencia de pagos</p>
              <div class="frecuencias">
                <input type="radio" v-model="form.frecuencia" id="radio_semanal" name="period" value="Pago Único" />
                <label for="radio_semanal">Pago único</label>
                <input type="radio" v-model="form.frecuencia" id="radio_quincenal" name="period" value="Quincenal" />
                <label for="radio_quincenal">Quincenal</label>
                <input type="radio" v-model="form.frecuencia" id="radio_mensual" name="period" value="Mensual" />
                <label for="radio_mensual">Mensual</label>
                </div>
            </div>
            <div class="cantidad">
              <p>Cantidad</p>
              <vue-autonumeric v-model="form.cantidad"
                :options="{
                  currencySymbol: '$',
                  decimalPlaces: 2,
                  minimumValue: 0,
                }" placeholder="$0.00"></vue-autonumeric>
            </div>
          </div>
        </div>
      </div>
      <button class="next" @click="next()" v-bind:disabled="!isDeudaValid">Siguiente <i class="material-icons">arrow_forward</i></button>
    </div>
  </div>
</template>

<script>
import { QField, QInput, QBtn } from 'quasar'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'

export default {
  name: 'Deuda',
  data () {
    return {
      form: {
        id: 1,
        exist: null,
        deuda: null,
        frecuencia: null,
        cantidad: null,
        cantidadMensual: null
      },
      deudaExist: false,
      clickedDeuda: false
    }
  },
  created () {
    this.$store.dispatch('deuda/get', this.form.id)
      .then(item => {
        this.form.id = item.id
        this.form.exist = item.exist
        this.form.deuda = item.deuda
        this.form.frecuencia = item.frecuencia
        this.form.cantidad = item.cantidad
        this.form.cantidadMensual = item.cantidadMensual
      })
  },
  methods: {
    next () {
      this.$store.dispatch('deuda/store', this.form)
        .then(item => {
          this.$emit('saved', this.form)
        })
    },
    calcularCantidadMensual () {
      if (this.form.frecuencia === 'Pago Único') {
        this.form.cantidad = this.form.deuda
        this.form.cantidadMensual = this.form.cantidad
      }
      if (this.form.frecuencia === 'Quincenal') {
        this.form.cantidadMensual = this.form.cantidad * 2
      }
      if (this.form.frecuencia === 'Mensual') {
        this.form.cantidadMensual = this.form.cantidad
      }
    }
  },
  computed: {
    // Validación para ir al siguiente paso
    isDeudaValid () {
      if (this.form.exist !== null) {
        return this.form.exist !== null
      } else {
        if (this.clickedDeuda !== false) {
          if (this.deudaExist !== true) {
            return this.clickedDeuda !== false
          } else {
            return this.deuda !== null && this.cantidadDeuda !== null && this.frecuenciaDeuda !== null
          }
        }
      }
    },
    // Calcular la cantidad mensual de la deuda
    EgresoCantidadMensual () {
      return this.calcularCantidadMensual()
    }
  },
  components: {
    QField, QInput, QBtn, VueAutonumeric
  }
}
</script>

<style>
</style>
