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
    {{ ChangeValidation() }}
    {{ Calcular() }}
    <div class="renta" v-if="form_recomendado.renta !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span v-bind:class="{'element-one': (form_recomendado.renta !== null)}">{{ porcentaje.renta }}%</span> Renta/Hipoteca</p>
          <p class="cantidad"> {{ PrintRenta}} </p>
        </div>
      </div>
    </div>
    <div class="despensa" v-if="form_recomendado.despensa !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span v-bind:class="{'element-one': (form_recomendado.renta === null), 'element-two': (form_recomendado.despensa !== null && form_recomendado.renta !== null)}">{{ porcentaje.despensa }}%</span> Despensa</p>
          <p class="cantidad"> {{ PrintDespensa }} </p>
        </div>
      </div>
    </div>
    <div class="gasolina" v-if="form_recomendado.gasolina !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span v-bind:class="{'element-one': (form_recomendado.renta === null && form_recomendado.despensa === null), 'element-two': (form_recomendado.despensa !== null && form_recomendado.renta !== null)}">{{ porcentaje.gasolina }}%</span> Gasolina/Uber</p>
          <p class="cantidad"> {{ PrintGasolina }} </p>
        </div>
      </div>
    </div>
    <div class="gustos" v-if="form_recomendado.gustos !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span>{{ porcentaje.gustos }}%</span> Gustos</p>
          <p class="cantidad"> {{ PrintGustos }} </p>
        </div>
      </div>
    </div>
    <div class="servicios" v-if="form_recomendado.servicios !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span>{{ porcentaje.servicios }}%</span> Servicios Básicos</p>
          <p class="cantidad"> {{ PrintServicios }} </p>
        </div>
      </div>
    </div>
    <div class="deuda" v-if="form_recomendado.deuda !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span>{{ porcentaje.deuda }}%</span> Deuda</p>
          <p class="cantidad">{{ PrintDeuda }}</p>
        </div>
      </div>
    </div>
    <div class="ahorro" v-if="form_recomendado.ahorro !== null">
      <div class="data-box">
        <div class="data">
          <p class="porcentaje"><span>{{ porcentaje.ahorro }}%</span> Ahorro</p>
          <p class="cantidad">{{ PrintAhorro }}</p>
        </div>
      </div>
    </div>

    <button>Ver mi meta <i class="material-icons">arrow_forward</i></button>
  </div>
</template>

<script>
import VueHighcharts from 'vue2-highcharts'
export default {
  name: 'Recomendado',
  data () {
    return {
      form: {
        ingreso: null,
        deuda: null,
        egresos: []
      },
      egresos_validation: {
        renta: false,
        despensa: false,
        gasolina: false,
        gustos: false,
        servicios: false,
        deuda: false
      },
      form_recomendado: {
        renta: null,
        despensa: null,
        gasolina: null,
        gustos: null,
        servicios: null,
        deuda: null,
        ahorro: null
      },
      porcentaje: {
        renta: null,
        despensa: null,
        gasolina: null,
        gustos: null,
        servicios: null,
        deuda: null,
        ahorro: null
      },
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
    ChangeValidation () {
      let validation = this.egresos_validation
      this.form.egresos.forEach(function (egreso, index) {
        if (egreso.egreso === 'Renta/Hipoteca') {
          validation.renta = true
        }
        if (egreso.egreso === 'Despensa') {
          validation.despensa = true
        }
        if (egreso.egreso === 'Gasolina/Uber') {
          validation.gasolina = true
        }
        if (egreso.egreso === 'Gustos') {
          validation.gustos = true
        }
        if (egreso.egreso === 'Servicios básicos') {
          validation.servicios = true
        }
      })
      if (this.form.deuda !== null) {
        validation.deuda = true
      }
    },
    Calcular () {
      let validation = this.egresos_validation
      let recomendado = this.form_recomendado
      let porcentaje = this.porcentaje

      // 1
      if (validation.renta === true && validation.despensa === false && validation.gasolina === false && validation.gustos === false && validation.servicios === false && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.60
        //
        porcentaje.renta = 25
        porcentaje.gustos = 15
        porcentaje.ahorro = 60
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === false && validation.gustos === false && validation.servicios === false && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === true && validation.gustos === false && validation.servicios === false && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.renta = 25
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === false && validation.gustos === true && validation.servicios === false && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.60
        //
        porcentaje.renta = 25
        porcentaje.gustos = 15
        porcentaje.ahorro = 60
      }

      // 5
      if (validation.renta === true && validation.despensa === false && validation.gasolina === false && validation.gustos === false && validation.servicios === true && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.renta = 25
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === false && validation.gustos === false && validation.servicios === false && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.renta = 25
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === true && validation.gustos === false && validation.servicios === false && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === false && validation.gustos === true && validation.servicios === false && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === false && validation.gustos === false && validation.servicios === true && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      // 10
      if (validation.renta === true && validation.despensa === true && validation.gasolina === false && validation.gustos === false && validation.servicios === false && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === true && validation.gustos === true && validation.servicios === false && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.renta = 25
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === true && validation.gustos === false && validation.servicios === true && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === true && validation.gustos === false && validation.servicios === false && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.gasolina = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === false && validation.gustos === true && validation.servicios === true && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.renta = 25
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      // 15
      if (validation.renta === true && validation.despensa === false && validation.gasolina === false && validation.gustos === true && validation.servicios === false && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.renta = 25
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === false && validation.gustos === false && validation.servicios === true && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === true && validation.gustos === true && validation.servicios === false && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === true && validation.gustos === false && validation.servicios === true && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.30
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 30
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === true && validation.gustos === false && validation.servicios === false && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.30
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 30
      }

      // 20
      if (validation.renta === true && validation.despensa === true && validation.gasolina === false && validation.gustos === true && validation.servicios === true && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.20
        recomendado.ahorro = this.form.ingreso * 0.35
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 20
        porcentaje.ahorro = 35
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === true && validation.gustos === true && validation.servicios === true && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === true && validation.gustos === true && validation.servicios === false && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.gasolina = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === true && validation.gustos === false && validation.servicios === true && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.30
        //
        porcentaje.renta = 25
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 30
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === false && validation.gustos === true && validation.servicios === true && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      // 25
      if (validation.renta === true && validation.despensa === true && validation.gasolina === false && validation.gustos === true && validation.servicios === false && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.40
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 40
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === false && validation.gustos === false && validation.servicios === true && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.30
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 30
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === true && validation.gustos === true && validation.servicios === true && validation.deuda === false) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.30
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 30
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === true && validation.gustos === true && validation.servicios === false && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.30
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.deuda = 10
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 30
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === true && validation.gustos === false && validation.servicios === true && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.20
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.deuda = 10
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 20
      }

      // 30
      if (validation.renta === true && validation.despensa === true && validation.gasolina === false && validation.gustos === true && validation.servicios === true && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.30
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.deuda = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 30
      }

      if (validation.renta === true && validation.despensa === false && validation.gasolina === true && validation.gustos === true && validation.servicios === true && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.30
        //
        porcentaje.renta = 25
        porcentaje.deuda = 10
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 30
      }

      if (validation.renta === true && validation.despensa === true && validation.gasolina === true && validation.gustos === true && validation.servicios === true && validation.deuda === true) {
        recomendado.renta = this.form.ingreso * 0.25
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.20
        //
        porcentaje.renta = 25
        porcentaje.despensa = 10
        porcentaje.deuda = 10
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 20
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === false && validation.gustos === false && validation.servicios === false && validation.deuda === false) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.75
        //
        porcentaje.despensa = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 75
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === true && validation.gustos === false && validation.servicios === false && validation.deuda === false) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 65
      }

      // 35
      if (validation.renta === false && validation.despensa === true && validation.gasolina === false && validation.gustos === true && validation.servicios === false && validation.deuda === false) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.75
        //
        porcentaje.despensa = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 75
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === false && validation.gustos === false && validation.servicios === true && validation.deuda === false) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 65
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === false && validation.gustos === false && validation.servicios === false && validation.deuda === true) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.despensa = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 65
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === true && validation.gustos === true && validation.servicios === false && validation.deuda === false) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 65
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === true && validation.gustos === false && validation.servicios === true && validation.deuda === false) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.55
        //
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 55
      }

      // 40
      if (validation.renta === false && validation.despensa === true && validation.gasolina === true && validation.gustos === false && validation.servicios === false && validation.deuda === true) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.55
        //
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 55
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === false && validation.gustos === true && validation.servicios === true && validation.deuda === false) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 65
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === false && validation.gustos === true && validation.servicios === false && validation.deuda === true) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.15
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.60
        //
        porcentaje.despensa = 10
        porcentaje.deuda = 15
        porcentaje.gustos = 15
        porcentaje.ahorro = 60
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === false && validation.gustos === false && validation.servicios === true && validation.deuda === true) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.55
        //
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 55
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === true && validation.gustos === true && validation.servicios === true && validation.deuda === false) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.55
        //
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 55
      }

      // 45
      if (validation.renta === false && validation.despensa === true && validation.gasolina === true && validation.gustos === true && validation.servicios === false && validation.deuda === true) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.55
        //
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 55
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === true && validation.gustos === false && validation.servicios === true && validation.deuda === true) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.45
        //
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 45
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === false && validation.gustos === true && validation.servicios === true && validation.deuda === true) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.55
        //
        porcentaje.despensa = 10
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 55
      }

      if (validation.renta === false && validation.despensa === true && validation.gasolina === true && validation.gustos === true && validation.servicios === true && validation.deuda === true) {
        recomendado.despensa = this.form.ingreso * 0.10
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.45
        //
        porcentaje.despensa = 10
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 45
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === true && validation.gustos === false && validation.servicios === false && validation.deuda === false) {
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.20
        recomendado.ahorro = this.form.ingreso * 0.70
        //
        porcentaje.gasolina = 10
        porcentaje.gustos = 20
        porcentaje.ahorro = 70
      }

      // 50
      if (validation.renta === false && validation.despensa === false && validation.gasolina === true && validation.gustos === true && validation.servicios === false && validation.deuda === false) {
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.75
        //
        porcentaje.gasolina = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 75
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === true && validation.gustos === false && validation.servicios === true && validation.deuda === false) {
        recomendado.gasolina = this.form.ingreso * 0.15
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.60
        //
        porcentaje.gasolina = 15
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 60
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === true && validation.gustos === false && validation.servicios === false && validation.deuda === true) {
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.gasolina = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 65
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === true && validation.gustos === true && validation.servicios === true && validation.deuda === false) {
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 65
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === true && validation.gustos === true && validation.servicios === false && validation.deuda === true) {
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.gasolina = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 65
      }

      // 55
      if (validation.renta === false && validation.despensa === false && validation.gasolina === true && validation.gustos === false && validation.servicios === true && validation.deuda === true) {
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.55
        //
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.ahorro = 55
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === true && validation.gustos === true && validation.servicios === true && validation.deuda === true) {
        recomendado.gasolina = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.deuda = this.form.ingreso * 0.15
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.50
        //
        porcentaje.gasolina = 10
        porcentaje.servicios = 10
        porcentaje.deuda = 15
        porcentaje.gustos = 15
        porcentaje.ahorro = 50
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === false && validation.gustos === true && validation.servicios === false && validation.deuda === false) {
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.ahorro = this.form.ingreso * 0.85
        //
        porcentaje.gustos = 15
        porcentaje.ahorro = 85
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === false && validation.gustos === true && validation.servicios === true && validation.deuda === false) {
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.ahorro = this.form.ingreso * 0.75
        //
        porcentaje.gustos = 15
        porcentaje.servicios = 10
        porcentaje.ahorro = 75
      }

      if (validation.renta === false && validation.despensa === false && validation.gasolina === false && validation.gustos === true && validation.servicios === false && validation.deuda === true) {
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.ahorro = this.form.ingreso * 0.75
        //
        porcentaje.gustos = 15
        porcentaje.deuda = 10
        porcentaje.ahorro = 75
      }

      // 60
      if (validation.renta === false && validation.despensa === false && validation.gasolina === false && validation.gustos === true && validation.servicios === true && validation.deuda === true) {
        recomendado.gustos = this.form.ingreso * 0.15
        recomendado.deuda = this.form.ingreso * 0.10
        recomendado.servicios = this.form.ingreso * 0.10
        recomendado.ahorro = this.form.ingreso * 0.65
        //
        porcentaje.deuda = 10
        porcentaje.gustos = 15
        porcentaje.servicios = 10
        porcentaje.ahorro = 65
      }
    },
    loadChart () {
      let dataPrueba = []
      let renta = this.form_recomendado.renta
      let despensa = this.form_recomendado.despensa
      let gasolina = this.form_recomendado.gasolina
      let gustos = this.form_recomendado.gustos
      let servicios = this.form_recomendado.servicios
      let deuda = this.form_recomendado.deuda
      let ahorro = this.form_recomendado.ahorro

      if (renta !== null) {
        dataPrueba.push(renta)
      }
      if (despensa !== null) {
        dataPrueba.push(despensa)
      }
      if (gasolina !== null) {
        dataPrueba.push(gasolina)
      }
      if (gustos !== null) {
        dataPrueba.push(gustos)
      }
      if (servicios !== null) {
        dataPrueba.push(servicios)
      }
      if (deuda !== null) {
        dataPrueba.push(deuda)
      }
      if (ahorro !== null) {
        dataPrueba.push(ahorro)
      }

      console.log(dataPrueba)

      let DataPie = {
        name: 'Presupuesto',
        data: (dataPrueba)
      }
      this.$refs.pieChart.addSeries(DataPie)
    }
  },
  computed: {
    PrintIngreso () {
      let value = this.form.ingreso
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintRenta () {
      let value = this.form_recomendado.renta
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintDespensa () {
      let value = this.form_recomendado.despensa
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintGasolina () {
      let value = this.form_recomendado.gasolina
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintGustos () {
      let value = this.form_recomendado.gustos
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintServicios () {
      let value = this.form_recomendado.servicios
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintDeuda () {
      let value = this.form_recomendado.deuda
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintAhorro () {
      let value = this.form_recomendado.ahorro
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    }
  },
  components: {
    VueHighcharts
  }
}
</script>

<style>
</style>
