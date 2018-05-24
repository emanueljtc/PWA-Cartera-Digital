<template>
  <div class="container">
    <div class="grafica">
      <vue-highcharts
        :options="pieOptions"
        ref="pieChart"
      >
      </vue-highcharts>
      <p class="total"><span>Total:</span> {{ PrintIngreso }}</p>
    </div>
    <div class="egresos" v-for="(egreso, key) in form.egresos" :key="key">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span v-bind:class="{'element-one': (form.egresos.indexOf(egreso) === 0), 'element-two': (form.egresos.indexOf(egreso) === 1), 'element-three': (form.egresos.indexOf(egreso) === 2), 'element-four': (form.egresos.indexOf(egreso) === 3), 'element-five': (form.egresos.indexOf(egreso) === 4) }">{{ PorcentajeEgresos(egreso) }}%</span> {{ egreso.egreso }}</p>
          <p class="cantidad"> {{ PrintEgresos(egreso) }} </p>
        </div>
      </div>
    </div>
    <div class="deuda" v-if="form.deuda !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span v-bind:class="{'element-two': (form.egresos.length === 1), 'element-three': (form.egresos.length === 2), 'element-four': (form.egresos.length === 3), 'element-five': (form.egresos.length === 4), 'element-six': (form.egresos.length === 5), 'element-seven': (form.egresos.length === 6)}">{{ PorcentajeDeuda }}%</span> Deuda</p>
          <p class="cantidad">{{ PrintDeuda }}</p>
        </div>
      </div>
    </div>
    {{ CalcularAhorro() }}
    {{ CalcularExcedente() }}
    <div class="ahorro" v-if="ahorro > 0">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span v-bind:class="{'element-two': (position.length === 1), 'element-three': (position.length === 2), 'element-four': (position.length === 3), 'element-five': (position.length === 4), 'element-six': (position.length === 5), 'element-seven': (position.length === 6)}">{{ PorcentajeAhorro }}%</span> Ahorro</p>
          <p class="cantidad"> {{ PrintAhorro }} </p>
        </div>
      </div>
    </div>
    <div class="excedente" v-if="excedente > 0">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span v-bind:class="{'element-two': (position.length === 1), 'element-three': (position.length === 2), 'element-four': (position.length === 3), 'element-five': (position.length === 4), 'element-six': (position.length === 5), 'element-seven': (position.length === 6)}">{{ PorcentajeExcedente }}%</span> Cantidad Excedente</p>
          <p class="cantidad"> {{ PrintExcedente }} </p>
        </div>
      </div>
    </div>
    <button>Ver mi meta <i class="material-icons">arrow_forward</i></button>
  </div>
</template>

<script>
import VueHighcharts from 'vue2-highcharts'
export default {
  name: 'Actual',
  data () {
    return {
      form: {
        ingreso: null,
        deuda: null,
        egresos: []
      },
      position: [],
      ahorro: null,
      excedente: null,
      pieOptions: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: false,
            alpha: 45
          },
          backgroundColor: '#fcfcfc',
          height: 300
        },
        title: {
          text: ''
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: 'Cantidad',
            data: []
          }
        ],
        colors: [
          '#64c9db',
          '#c0d84a',
          '#e03757',
          '#59ba70',
          '#af85bc',
          '#fbbb2f',
          '#6179bb',
          '#7cb5ec',
          '#434348',
          '#90ed7d',
          '#f7a35c',
          '#8085e9'
        ]
      }
    }
  },
  created () {
    setTimeout(() => {
      this.loadChart()
    }, 500)
    this.$store.dispatch('ingresos/get', 1)
      .then(item => {
        this.form.ingreso = item.ingreso
      })

    this.$store.dispatch('egresos/all')
      .then(egresos => {
        egresos.forEach((egreso) => {
          this.form.egresos.push(egreso)
          this.position.push(egreso.id)
        })
      })

    this.$store.dispatch('deuda/get', 1)
      .then(item => {
        this.form.deuda = item.cantidadMensual
        if (item.deuda !== null) {
          this.position.push(item.id)
        }
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
    CalcularAhorro () {
      let totalIngreso = this.form.ingreso
      let totalEgresos = 0
      this.form.egresos.forEach(function (egreso, index) {
        totalEgresos = totalEgresos + egreso.cantidadMensual
      })
      let ahorro = totalIngreso - totalEgresos - this.form.deuda
      if (ahorro > 0) {
        this.ahorro = ahorro
      } else {
        this.ahorro = null
      }
    },
    CalcularExcedente () {
      let totalIngreso = this.form.ingreso
      let totalEgresos = 0
      this.form.egresos.forEach(function (egreso, index) {
        totalEgresos = totalEgresos + egreso.cantidadMensual
      })
      let total = totalEgresos + this.form.deuda
      let excedente = total - totalIngreso
      if (excedente > 0) {
        this.excedente = excedente
      } else {
        this.excedente = null
      }
    },
    loadChart () {
      let dataPrueba = []
      let egresos = this.form.egresos
      let deuda = this.form.deuda
      let ahorro = this.ahorro
      let excedente = this.excedente

      egresos.forEach(function (egresos) {
        dataPrueba.push(egresos.cantidadMensual)
      })
      if (deuda !== null) {
        dataPrueba.push(deuda)
      }
      if (ahorro !== null) {
        dataPrueba.push(ahorro)
      }
      if (excedente !== null) {
        dataPrueba.push(excedente)
      }

      let DataPie = {
        name: 'Presupuesto',
        data: (dataPrueba)
      }
      this.$refs.pieChart.addSeries(DataPie)
    }
    //
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
    PrintAhorro () {
      let ahorro = this.ahorro
      let value = ahorro
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    //
    PrintExcedente () {
      let excedente = this.excedente
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
      let ahorro = this.ahorro
      let porcentaje = Math.round((ahorro * 100) / this.form.ingreso)
      return porcentaje
    },
    PorcentajeExcedente () {
      let excedente = this.excedente
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
