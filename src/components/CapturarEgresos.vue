<template>
  <div class="container egresos">
    <div class="content">
      <h2>Egresos</h2>
      <p>Especifica tus egresos</p>
      {{ setId() }}
      {{ ServiciosBasicos() }}
      <q-field>
        <q-select
          v-model="form_egreso.egreso"
          :options="selectOptions"
          float-label="Selecciona una opción"
        />
      </q-field>
      <div class="input-field center-align">
        <div class="row-m">
          <p class="frecuencia_sub">Frecuencia</p>
          <p class="cantidad_sub">Cantidad</p>
        </div>
      </div>
      <div class="input-field center-align">
        <div class="row-m">
          <div class="period">
            <input type="radio" v-model="form_egreso.frecuencia" id="radio_semanal" name="period" value="Semanal" />
            <label for="radio_semanal">Semanal</label>
            <input type="radio" v-model="form_egreso.frecuencia" id="radio_quincenal" name="period" value="Quincenal" />
            <label for="radio_quincenal">Quincenal</label>
            <input type="radio" v-model="form_egreso.frecuencia" id="radio_mensual" name="period" value="Mensual" />
            <label for="radio_mensual">Mensual</label>
          </div>
          <div class="cantidad">
            <p class="cantidad_sub_mob">Cantidad</p>
            <q-field>
               <vue-autonumeric v-model="form_egreso.cantidad"
                :options="{
                  currencySymbol: '$',
                  decimalPlaces: 2,
                  minimumValue: 0,
                }" placeholder="'$0.00'"></vue-autonumeric>
            </q-field>
          </div>
        </div>
      </div>
      <div class="collapsible-box">
        <q-list v-for="(egreso, key) in form.egresos" :key="key">
            <q-collapsible v-bind:class="{ 'element-one': egreso.id === 1, 'element-two': egreso.id === 2, 'element-three': egreso.id === 3, 'element-four': egreso.id === 4, 'element-five': egreso.id === 5 }" group="somegroup" :label='labelCantidad(egreso)'>
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
                      <input type="radio" v-model="egreso.frecuencia" :id="frecuenciaSemanalEgreso(egreso)" :name="periodoagregadoEgreso(egreso)" value="Semanal" />
                      <label :for="frecuenciaSemanalEgreso(egreso)">Semanal</label>
                      <input type="radio" v-model="egreso.frecuencia" :id="frecuenciaQuincenalEgreso(egreso)" :name="periodoagregadoEgreso(egreso)" value="Quincenal" />
                      <label :for="frecuenciaQuincenalEgreso(egreso)">Quincenal</label>
                      <input type="radio" v-model="egreso.frecuencia" :id="frecuenciaMensualEgreso(egreso)" :name="periodoagregadoEgreso(egreso)" value="Mensual" />
                      <label :for="frecuenciaMensualEgreso(egreso)">Mensual</label>
                    </div>
                    <div class="cantidad">
                      <p class="cantidad_sub_mob">Cantidad</p>
                      <q-field>
                         <vue-autonumeric v-model="egreso.cantidad"
                          :options="{
                            currencySymbol: '$',
                            decimalPlaces: 2,
                            minimumValue: 0,
                          }" :placeholder="egreso.cantidad" v-bind:class="{ 'element-one-input': egreso.id === 1, 'element-two-input': egreso.id === 2, 'element-three-input': egreso.id === 3, 'element-four-input': egreso.id === 4, 'element-five-input': egreso.id === 5 }"></vue-autonumeric>
                      </q-field>
                    </div>
                  </div>
                </div>
                <q-btn class="borrar" flat label="Borrar" @click="deleteEgreso(egreso)" />
                <q-btn class="actualizar" flat label="Actualizar" @click="actualizarEgreso(egreso)" />
            </div>
          </q-collapsible>
        </q-list>
      </div>
      <div class="input-field center-align">
        <div class="row-m">
          <q-btn :label="AgregarEgresos" @click="crearEgreso(), egresoExist = true"  v-show="form.egresos.length < 4" icon="add"/>
        </div>
      </div>
      <p class="total_egresos"><b>Total: </b>{{ calcularTotal() }}</p>
      <button class="next" @click="NextEgreso()" v-bind:disabled="!isEgresoValid" icon-right="fas fa-arrow-right">Siguiente <i class="material-icons">arrow_forward</i></button>
    </div>
  </div>
</template>

<script>
import { QField, QInput, QSelect, QRadio, QModal, QBtn, QCollapsible, Notify } from 'quasar'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'

export default {
  name: 'Egresos',
  data () {
    return {
      form: {
        egresos: []
      },
      position: [],
      form_egreso: {
        id: null,
        egreso: null,
        frecuencia: null,
        cantidad: 0,
        cantidadMensual: null
      },
      serviciosBasicosExist: false,
      hola: false,
      //
      selectOptions: [
        {
          label: 'Renta/Hipoteca',
          value: 'Renta/Hipoteca'
        },
        {
          label: 'Despensa',
          value: 'Despensa'
        },
        {
          label: 'Gasolina/Uber',
          value: 'Gasolina/Uber'
        },
        {
          label: 'Gustos',
          value: 'Gustos'
        },
        {
          label: 'Servicios básicos',
          value: 'Servicios básicos'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('egresos/all')
      .then(egresos => {
        egresos.forEach((egreso) => {
          this.form.egresos.push(egreso)
        })
      })
  },
  methods: {
    // Guardar egresos en store y db
    NextEgreso () {
      if (this.form_egreso.frecuencia === 'Semanal') {
        this.form_egreso.cantidadMensual = this.form_egreso.cantidad * 4
      }
      if (this.form_egreso.frecuencia === 'Quincenal') {
        this.form_egreso.cantidadMensual = this.form_egreso.cantidad * 2
      }
      if (this.form_egreso.frecuencia === 'Mensual') {
        this.form_egreso.cantidadMensual = this.form_egreso.cantidad
      }

      let form_egreso = this.form_egreso
      let results = this.form.egresos.filter(function (element, index) {
        return element.egreso === form_egreso.egreso
      })
      if (results.length > 0) {
        this.$q.notify({
          message: `Ya existe este tipo de egreso`,
          timeout: 5000,
          position: 'top-right'
        })
        this.resetFormEgreso()
      } else {
        if (this.form.egresos.length < 6) {
          if (form_egreso.egreso !== null && form_egreso.frecuencia !== null && form_egreso.cantidad !== 0) {
            this.form.egresos.push(form_egreso)
            this.$store.dispatch('egresos/store', form_egreso)
              .then(item => {
                this.$emit('saved', this.serviciosBasicosExist)
              })
            this.resetFormEgreso()
          } else {
            this.$emit('saved', this.serviciosBasicosExist)
          }
        } else {
          this.resetFormEgreso()
        }
      }
    },
    crearEgreso () {
      if (this.form_egreso.frecuencia === 'Semanal') {
        this.form_egreso.cantidadMensual = this.form_egreso.cantidad * 4
      }
      if (this.form_egreso.frecuencia === 'Quincenal') {
        this.form_egreso.cantidadMensual = this.form_egreso.cantidad * 2
      }
      if (this.form_egreso.frecuencia === 'Mensual') {
        this.form_egreso.cantidadMensual = this.form_egreso.cantidad
      }

      let form_egreso = this.form_egreso
      let results = this.form.egresos.filter(function (element, index) {
        return element.egreso === form_egreso.egreso
      })
      if (results.length > 0) {
        this.$q.notify({
          message: `Ya existe este tipo de egreso`,
          timeout: 5000,
          position: 'top-right'
        })
      } else {
        if (form_egreso.egreso !== null && form_egreso.frecuencia !== null && form_egreso.cantidad !== 0) {
          this.$store.dispatch('egresos/store', form_egreso)
          this.position.push(form_egreso.id)
          this.form.egresos.push(form_egreso)
          this.resetFormEgreso()
        }
      }
    },
    // Reset al formulario y eliminar egresos
    resetFormEgreso () {
      this.form_egreso = {
        id: this.form.egresos.length + 1,
        egreso: null,
        frecuencia: null,
        cantidad: 0,
        cantidadMensual: null
      }
    },
    deleteEgreso (egreso) {
      this.form.egresos = this.form.egresos.filter((element, index) => element.egreso !== egreso.egreso)
      this.$store.dispatch('egresos/delete', egreso.id)
    },
    // Actualizar información del egreso en db y store
    actualizarEgreso (egreso) {
      this.$store.dispatch('egresos/store', egreso)
      this.$q.notify({
        message: `Actualizado Correctamente`,
        timeout: 5000,
        color: 'positive',
        position: 'top-right'
      })
    },
    // Actualizar la cantidad mensual de cada egreso
    actualizarCantidadMensual (egreso) {
      if (egreso.frecuencia === 'Semanal') {
        egreso.cantidadMensual = egreso.cantidad * 4
      }
      if (egreso.frecuencia === 'Quincenal') {
        egreso.cantidadMensual = egreso.cantidad * 2
      }
      if (egreso.frecuencia === 'Mensual') {
        egreso.cantidadMensual = egreso.cantidad
      }
    },
    // Calcular el total mensual de todos los egresos guardados
    calcularTotal () {
      let total = 0
      this.form.egresos.forEach(function (egreso) {
        total = egreso.cantidadMensual + total
      })
      let value = total
      let totalFinal = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return totalFinal
    },
    // Label con el egreso y cantidad mensual
    labelCantidad (egreso) {
      let value = egreso.cantidadMensual
      let num = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let printlabel = egreso.egreso + ' - ' + num
      return printlabel
    },
    // Dar el id a cada egreso
    setId () {
      let array = null
      let arrayLenght = this.form.egresos.length
      let lastElement = null
      let setid = 0

      if (arrayLenght > 0) {
        array = this.form.egresos
        lastElement = array[array.length - 1]
        setid = lastElement.id + 1
      } else {
        setid = 1
      }

      this.form_egreso.id = setid
    },
    // Servicios básicos existe
    ServiciosBasicos () {
      let servicios = false
      this.form.egresos.forEach(function (egreso) {
        if (egreso.egreso === 'Servicios básicos') {
          servicios = true
        }
      })
      this.serviciosBasicosExist = servicios
      this.$emit('update', this.serviciosBasicosExist)
    },
    // Crear ids y names unicos en cada input de los formularios
    frecuenciaSemanalEgreso (egreso) {
      let result = egreso.id
      return `semanal_${result}`
    },
    frecuenciaQuincenalEgreso (egreso) {
      let result = egreso.id
      return `quincenal_${result}`
    },
    frecuenciaMensualEgreso (egreso) {
      let result = egreso.id
      return `mensual_${result}`
    },
    periodoagregadoEgreso (egreso) {
      let result = egreso.id
      return `periodo_${result}`
    }
  },
  computed: {
    // Validación para ir al siguiente paso
    isEgresoValid () {
      if (this.form.egresos.length <= 0) {
        return this.form_egreso.egreso !== null && this.form_egreso.cantidad !== 0 && this.form_egreso.frecuencia !== null
      } else {
        return this.form.egresos.length > 0
      }
    },
    // Label de agregar opción
    AgregarEgresos () {
      const length = this.form.egresos.length + 1
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
