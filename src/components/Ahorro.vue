<template>
<div>
    <p class="sub-title">Tu ahorro a largo plazo es de</p>
        <h2 class="layer">{{ PrintCapitalInicial }}</h2>
        <div class="buttons">
          <button class="btn btn-primary">Axend</button>
          <button class="btn btn-secondary highcharts-series-1">Kuspit</button>
          <button class="btn btn-tree">Feudo Capital</button>
        </div>
        <div class="grafica">
            <p class="meses" style="display: none">Meses</p>
            <div class="highcharts" :style="styles">
                <IHighCharts
                    :options="options"
                    :loading="loading"
                    :resizable="true"
                    @load="onLoad"
                    @resize="onResize"
                />
            </div>
        </div>
        <div class="meta">
           <i class="fas fa-star"></i>
           <p class="meta-text">{{ PrintProposito }}</p>
           <p class="meta-value">{{ PrintMeta }}</p>
        </div>
        <q-field>
            <q-list separator>
                <q-collapsible label="Opciones de Inversión" opened class="select">
                    <div>
                        <q-list link >
                            <q-item>
                                <q-item-main>
                                    <q-item-tile label>Axend <a href="#" class="ver-ms ver-ms-p">Ver más</a></q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item-separator inset />
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile label>Kuspit <a href="#" class="ver-ms ver-ms-p">Ver más</a></q-item-tile>
                                    </q-item-main>
                                </q-item>
                            <q-item-separator inset />
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile label>Feudo Capital <a href="#" class="ver-ms ver-ms-lg">Ver más</a></q-item-tile>
                                    </q-item-main>
                                </q-item>
                        </q-list>
                    </div>

                </q-collapsible>
            </q-list>
        </q-field>
       <button type="submit" class="btn-next">Siguiente <i class="material-icons">arrow_forward</i></button>
  </div>
</template>

<script>
import CapturarIngreso from '../components/CapturarIngreso'
import CapturarEgresos from '../components/CapturarEgresos'
import CapturarCapitalInicial from '../components/CapturarCapitalInicial'
import CapturarMetas from '../components/CapturarMetas'
import { QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QBtnDropdown, QList, QSelect, QListHeader, QItem, QItemSide, QItemTile, QItemSeparator, QItemMain, QSideLink, QCollapsible } from 'quasar'
import IHighCharts from 'vue-highcharts-v5/src/HighCharts.js'
export default {
  name: 'Ahorro',
  data () {
    return {
      form: {
        id: 1,
        exist: null,
        meta: null,
        proposito: null,
        ingreso: null,
        deuda: null,
        egreso: [],
        capitalInicial: null
      },
      ahorro: null,
      axend: null,
      styles: {},
      loading: true,
      options: {
        lang: {
          loading: ''
        },
        chart: {
          type: 'spline',
          inverted: false
        },
        title: {
          text: ' '
        },
        subtitle: {
          text: ''
        },
        yAxis: {
          labels: {
            format: '{value} k'
          },
          title: {
            text: ''
          }
        },
        xAxis: {
          lineWidth: 1,
          tickInterval: 1, // con este intervalo logro llegar a los 12 meses
          min: 0, // se establece el minimo del intervalo
          max: 12, // se establece el maximo en este caso 12 = 12 meses
          title: {
            text: ''
          }
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true
            }
          }
        },
        series: [{
          name: 'Axend',
          data: this.PrintAxend, // obtener resultado de formula de Axend
          color: '#e03757'
        }, {
          name: 'Kuspid',
          data: [1],
          color: '#c0d84a'
        }, {
          name: 'Feudo Capital',
          data: [3],
          color: '#cdcdcd'
        }]
      }
    }
  },
  methods: {
    onLoad (instance, HighCharts) {
      console.log(instance, HighCharts)
    },
    onResize (width, height) {
      console.log(width, height)
    }
  },
  created () {
    this.$store.dispatch('metas/get', this.form.id)
      .then(item => {
        this.form.id = item.id
        this.form.exist = item.exist
        this.form.meta = item.meta
        this.form.proposito = item.proposito
      })
    this.$store.dispatch('ingresos/get', this.form.id)
      .then(item => {
        this.form.id = item.id
        this.form.ingreso = item.ingreso
      })
    this.$store.dispatch('deuda/get', 1)
      .then(item => {
        this.form.deuda = item.cantidadMensual
      })
    this.$store.dispatch('egresos/get', this.form.id)
      .then(item => {
        this.form.id = item.id
        this.form.egreso = item.cantidad
      })
    this.$store.dispatch('capital/get', this.form.id)
      .then(item => {
        this.form.id = item.id
        this.form.exist = item.exist
        this.form.capitalInicial = item.capitalInicial
      })
  },
  computed: {
    PrintMeta () {
      let value = this.form.meta
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintProposito () {
      return this.form.proposito
    },
    PrintIngreso () {
      return this.form.ingreso
    },
    PrintEgresos () {
      return this.form.egreso
    },
    CalcularAhorro () {
      let totalIngreso = this.form.ingreso
      let totalEgresos = this.form.egreso
      let ahorro = totalIngreso - totalEgresos
      return ahorro
    },
    PrintAhorro () {
      let ahorro = this.CalcularAhorro
      let value = ahorro
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    Axend () {
      let ingreso = this.form.ingreso
      let ahorro = this.CalcularAhorro
      let interes = 1.25
      let axend = ingreso + ahorro * interes
      return axend
    },
    PrintAxend () {
      let a = this.Axend
      let value = a
      return parseFloat(value)
    },
    PrintCapitalInicial () {
      return this.form.capitalInicial
    }
  },
  components: {
    IHighCharts, QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QBtnDropdown, QList, QSelect, QListHeader, QItem, QItemSide, QItemTile, QItemSeparator, QItemMain, QSideLink, QCollapsible, CapturarMetas, CapturarIngreso, CapturarEgresos, CapturarCapitalInicial
  }
}
</script>
