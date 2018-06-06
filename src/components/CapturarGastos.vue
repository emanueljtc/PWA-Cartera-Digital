<template>
  <div class="container valign-wrapper gastos">
    <div class="content">
      <h2>Gastos más fuertes</h2>
      <p>¿Cuáles son tus gastos más fuertes?</p>
      {{ setId() }}
      <q-field>
        <q-select
          @click="mostrar_text_button"
          v-model="form_gasto.gasto"
          :options="selectOptionsGastos"
          float-label="Selecciona una opción"
        />
      </q-field>
        <p v-show="mostrar_text">Texto de prueba</p>
      <div class="input-field center-align">
        <div class="row-m">
          <p class="frecuencia_sub">Frecuencia</p>
          <p class="cantidad_sub">Cantidad</p>
        </div>
      </div>
      <div class="input-field center-align">
        <div class="row-m">
          <div class="period">
            <input type="radio" v-model="form_gasto.frecuencia" id="radio_semanal" name="period" value="Semanal" />
            <label for="radio_semanal">Semanal</label>
            <input type="radio" v-model="form_gasto.frecuencia" id="radio_quincenal" name="period" value="Quincenal" />
            <label for="radio_quincenal">Quincenal</label>
            <input type="radio" v-model="form_gasto.frecuencia" id="radio_mensual" name="period" value="Mensual" />
            <label for="radio_mensual">Mensual</label>
          </div>
          <div class="cantidad">
            <q-field>
              <vue-autonumeric v-model="form_gasto.cantidad"
                :options="{
                  currencySymbol: '$',
                  decimalPlaces: 2,
                  minimumValue: 0,
                }" placeholder="$0.00">
                </vue-autonumeric>
            </q-field>
          </div>
        </div>
      </div>
      <div class="collapsible-box">
        <q-list v-for="(gasto, key) in form.gastos" :key="key">
          <q-collapsible group="somegroup" :label='labelCantidad(gasto)'>
            <div>
              <div class="input-field center-align">
                <div class="row-m">
                  <p class="frecuencia_sub">Frecuencia</p>
                  <p class="cantidad_sub">Cantidad</p>
                </div>
              </div>
              <div class="input-field center-align">
                <div class="row-m">
                  <div class="period">
                    <input type="radio" v-model="gasto.frecuencia" :id="frecuenciaSemanalGasto(gasto)" :name="periodoagregadoGasto(gasto)" value="Semanal" />
                    <label :for="frecuenciaSemanalGasto(gasto)">Semanal</label>
                    <input type="radio" v-model="gasto.frecuencia" :id="frecuenciaQuincenalGasto(gasto)" :name="periodoagregadoGasto(gasto)" value="Quincenal" />
                    <label :for="frecuenciaQuincenalGasto(gasto)">Quincenal</label>
                    <input type="radio" v-model="gasto.frecuencia" :id="frecuenciaMensualGasto(gasto)" :name="periodoagregadoGasto(gasto)" value="Mensual" />
                    <label :for="frecuenciaMensualGasto(gasto)">Mensual</label>
                  </div>
                  <div class="cantidad">
                    <q-field>
                      <vue-autonumeric v-model="gasto.cantidad"
                        :options="{
                          currencySymbol: '$',
                          decimalPlaces: 2,
                          minimumValue: 0,
                        }" :placeholder="gasto.cantidad"></vue-autonumeric>
                        {{ actualizarCantidadMensual(gasto) }}
                    </q-field>
                  </div>
                </div>
              </div>
              <q-btn class="borrar" flat label="Borrar" @click="deleteGasto(gasto)" />
               <q-btn class="actualizar" flat label="Actualizar" @click="actualizarGasto(gasto)" />
            </div>
          </q-collapsible>
        </q-list>
      </div>
      <div class="input-field center-align">
        <div class="row-m">
          <q-btn :label="AgregarGastos" @click="crearGasto(), gastoExist = true"  v-show="form.gastos.length < 4" icon="add"/>
        </div>
      </div>
      <button class="next" @click="NextGasto(), gastoExist = true" v-bind:disabled="!isGastosValid" icon-right="fas fa-arrow-right">Siguiente <i class="material-icons">arrow_forward</i></button>
    </div>
  </div>
</template>

<script>
import { QField, QInput, QSelect, QRadio, QModal, QBtn, QCollapsible, Notify } from 'quasar'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'

export default {
  name: 'Gastos',
  data () {
    return {
      form: {
        gastos: []
      },
      form_gasto: {
        id: null,
        gasto: null,
        frecuencia: null,
        cantidad: 0,
        cantidadMensual: null
      },
      mostrar_text: false,
      //
      selectOptionsGastos: [
        {
          label: 'Smartphone',
          value: 'Smartphone'
        },
        {
          label: 'Luz',
          value: 'Luz'
        },
        {
          label: 'Gas',
          value: 'Gas'
        },
        {
          label: 'Agua',
          value: 'Agua'
        },
        {
          label: 'Telefonía, Cable/Internet',
          value: 'Telefonía, Cable/Internet'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('gastos/all')
      .then(gastos => {
        gastos.forEach((gastos) => {
          this.form.gastos.push(gastos)
        })
      })
  },
  methods: {
    mostrar_text_button: function () {
      this.mostrar_text = !this.mostrar_text
    },
    // Guardar gastos en store y db
    NextGasto () {
      if (this.form_gasto.frecuencia === 'Semanal') {
        this.form_gasto.cantidadMensual = this.form_gasto.cantidad * 4
      }
      if (this.form_gasto.frecuencia === 'Quincenal') {
        this.form_gasto.cantidadMensual = this.form_gasto.cantidad * 2
      }
      if (this.form_gasto.frecuencia === 'Mensual') {
        this.form_gasto.cantidadMensual = this.form_gasto.cantidad
      }

      let form_gasto = this.form_gasto
      let results = this.form.gastos.filter(function (element, index) {
        return element.gasto === form_gasto.gasto
      })
      if (results.length > 0) {
        this.$q.notify({
          message: `Ya existe este tipo de gasto`,
          timeout: 5000,
          position: 'top-right'
        })
        this.resetFormGasto()
      } else {
        if (this.form.gastos.length < 6) {
          if (form_gasto.gasto !== null && form_gasto.frecuencia !== null && form_gasto.cantidad !== 0) {
            this.form.gastos.push(form_gasto)
            this.$store.dispatch('gastos/store', form_gasto)
              .then(item => {
                this.$emit('saved', form_gasto)
              })
            this.resetFormGasto()
          } else {
            this.$emit('saved', form_gasto)
          }
        } else {
          this.resetFormGasto()
        }
      }
    },
    crearGasto () {
      if (this.form_gasto.frecuencia === 'Semanal') {
        this.form_gasto.cantidadMensual = this.form_gasto.cantidad * 4
      }
      if (this.form_gasto.frecuencia === 'Quincenal') {
        this.form_gasto.cantidadMensual = this.form_gasto.cantidad * 2
      }
      if (this.form_gasto.frecuencia === 'Mensual') {
        this.form_gasto.cantidadMensual = this.form_gasto.cantidad
      }

      let form_gasto = this.form_gasto
      let results = this.form.gastos.filter(function (element, index) {
        return element.gasto === form_gasto.gasto
      })
      if (results.length > 0) {
        this.$q.notify({
          message: `Ya existe este tipo de gasto`,
          timeout: 5000,
          position: 'top-right'
        })
      } else {
        if (form_gasto.gasto !== null && form_gasto.frecuencia !== null && form_gasto.cantidad !== 0) {
          this.$store.dispatch('gastos/store', form_gasto)
          this.form.gastos.push(form_gasto)
          this.resetFormGasto()
        }
      }
    },
    // Reset al formulario y eliminar gastos
    resetFormGasto () {
      this.form_gasto = {
        id: this.form.gastos.length + 1,
        gasto: null,
        frecuencia: null,
        cantidad: 0,
        cantidadMensual: null
      }
    },
    deleteGasto (gasto) {
      this.form.gastos = this.form.gastos.filter((element, index) => element.gasto !== gasto.gasto)
      this.$store.dispatch('gastos/delete', gasto.id)
    },
    // Actualizar información del gasto en db y store
    actualizarGasto (gasto) {
      this.$store.dispatch('gastos/store', gasto)
      this.$q.notify({
        message: `Actualizado Correctamente`,
        timeout: 5000,
        color: 'positive',
        position: 'top-right'
      })
    },
    // Actualizar la cantidad mensual de cada gasto
    actualizarCantidadMensual (gasto) {
      if (gasto.frecuencia === 'Semanal') {
        gasto.cantidadMensual = gasto.cantidad * 4
      }
      if (gasto.frecuencia === 'Quincenal') {
        gasto.cantidadMensual = gasto.cantidad * 2
      }
      if (gasto.frecuencia === 'Mensual') {
        gasto.cantidadMensual = gasto.cantidad
      }
    },
    // Label con el gasto y cantidad mensual
    labelCantidad (gasto) {
      let value = gasto.cantidadMensual
      let num = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let printlabel = gasto.gasto + ' - ' + num
      return printlabel
    },
    // Dar el id a cada gasto
    setId () {
      let setid = this.form.gastos.length + 1
      this.form_gasto.id = setid
    },
    // Crear ids y names unicos en cada input de los formularios
    frecuenciaSemanalGasto (gasto) {
      let result = gasto.id
      return `semanal_gastos_${result}`
    },
    frecuenciaQuincenalGasto (gasto) {
      let result = gasto.id
      return `quincenal_gastos_${result}`
    },
    frecuenciaMensualGasto (gasto) {
      let result = gasto.id
      return `mensual_gastos_${result}`
    },
    periodoagregadoGasto (gasto) {
      let result = gasto.id
      return `periodo_gastos_${result}`
    }
  },
  computed: {
    // Validación para ir al siguiente paso
    isGastosValid () {
      if (this.form.gastos.length <= 0) {
        return this.form_gasto.gasto !== null && this.form_gasto.cantidad !== 0 && this.form_gasto.frecuencia !== null
      } else {
        return this.form.gastos.length > 0
      }
    },
    // Label de agregar opción
    AgregarGastos () {
      const length = this.form.gastos.length + 1
      return `Agregar otra opción (${length}/5)`
    }
  },
  components: {
    QField, QInput, QSelect, QRadio, QModal, QBtn, QCollapsible, Notify, VueAutonumeric
  }
}
</script>

<style>
</style>
