<template>
  <div class="container">
    <div class="grafica">
      <p class="total"><span>Total:</span> {{ PrintIngreso }}</p>
    </div>
    <div class="egresos" v-for="(egreso, key) in form.egresos" :key="key">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span>{{ PorcentajeEgresos(egreso) }}%</span> {{ egreso.egreso }}</p>
          <p class="cantidad"> {{ PrintEgresos(egreso) }} </p>
        </div>
      </div>
    </div>
    <div class="deuda" v-if="form.deuda !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span>{{ PorcentajeDeuda }}%</span> Deuda</p>
          <p class="cantidad">{{ PrintDeuda }}</p>
        </div>
      </div>
    </div>
    {{ AgregarAhorro() }}
    <div class="ahorro" v-if="ahorro > 0">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span>{{ PorcentajeAhorro }}%</span> Ahorro</p>
          <p class="cantidad"> {{ PrintAhorro }} </p>
        </div>
      </div>
    </div>
    <div class="excedente" v-if="ahorro < 0">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span>{{ PorcentajeExcedente }}%</span> Cantidad Excedente</p>
          <p class="cantidad"> {{ PrintExcedente }} </p>
        </div>
      </div>
    </div>
    <button>Ver mi meta <i class="material-icons">arrow_forward</i></button>
  </div>
</template>

<script>
import VueHighcharts from 'vue-highcharts'
export default {
  name: 'Actual',
  data () {
    return {
      form: {
        ingreso: null,
        deuda: null,
        egresos: []
      },
      ahorro: null
    }
  },
  created () {
    this.$store.dispatch('ingresos/get', 1)
      .then(item => {
        this.form.ingreso = item.ingreso
      })

    this.$store.dispatch('deuda/get', 1)
      .then(item => {
        this.form.deuda = item.cantidadMensual
      })

    this.$store.dispatch('egresos/all')
      .then(egresos => {
        egresos.forEach((egreso) => {
          this.form.egresos.push(egreso)
        })
      })
  },
  methods: {
    PrintEgresos (egreso) {
      let value = egreso.cantidadMensual
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PorcentajeEgresos (egreso) {
      let porcentaje = Math.round((egreso.cantidadMensual * 100) / this.form.ingreso)
      return porcentaje
    },
    AgregarAhorro () {
      let totalIngreso = this.form.ingreso
      let totalEgresos = 0
      this.form.egresos.forEach(function (egreso, index) {
        totalEgresos = totalEgresos + egreso.cantidadMensual
      })
      let ahorro = totalIngreso - totalEgresos - this.form.deuda
      this.ahorro = ahorro
    }
  },
  computed: {
    PrintIngreso () {
      let value = this.form.ingreso
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintDeuda () {
      let value = this.form.deuda
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    //
    CalcularAhorro () {
      let totalIngreso = this.form.ingreso
      let totalEgresos = 0
      this.form.egresos.forEach(function (egreso, index) {
        totalEgresos = totalEgresos + egreso.cantidadMensual
      })
      let ahorro = totalIngreso - totalEgresos - this.form.deuda
      return ahorro
    },
    PrintAhorro () {
      let ahorro = this.CalcularAhorro
      let value = ahorro
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    //
    CalcularExcedente () {
      let totalIngreso = this.form.ingreso
      let totalEgresos = 0
      this.form.egresos.forEach(function (egreso, index) {
        totalEgresos = totalEgresos + egreso.cantidadMensual
      })
      let total = totalEgresos + this.form.deuda
      let excedente = total - totalIngreso
      return excedente
    },
    PrintExcedente () {
      let excedente = this.CalcularExcedente
      let value = excedente
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    //
    PorcentajeDeuda () {
      let porcentaje = Math.round((this.form.deuda * 100) / this.form.ingreso)
      return porcentaje
    },
    PorcentajeAhorro () {
      let ahorro = this.CalcularAhorro
      let porcentaje = Math.round((ahorro * 100) / this.form.ingreso)
      return porcentaje
    },
    PorcentajeExcedente () {
      let excedente = this.CalcularExcedente
      let porcentaje = Math.round((excedente * 100) / this.form.ingreso)
      return porcentaje
    }
  },
  components: {
    VueHighcharts
  }
}
</script>

<style>
</style>
