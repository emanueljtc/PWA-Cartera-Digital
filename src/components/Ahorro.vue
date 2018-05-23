<template>
<div>
    <p class="sub-title">Tu ahorro a largo plazo es de</p>
        <h2 class="layer">{{ PrintCapitalInicial }}</h2>
        <div class="buttons">
          <button class="btn btn-primary " @click="axend_button" >Axend</button>
          <button class="btn btn-secondary highcharts-series-1" @click="kuspit_button">Kuspit</button>
          <button class="btn btn-tree" @click="feudo_button">Feudo Capital</button>
        </div>
        <div class="grafica">
            <p class="meses">Meses</p>
            <div class="highcharts" :style="styles"  v-show="mostrar_axend">
                <vue-highcharts
                    :options="options"
                    :loading="loading"
                    :resizable="true"
                    ref = 'highcharts_axend'
                    @load="onLoad"
                    @resize="onResize"
                >
                </vue-highcharts>
            </div>
            <div class="highcharts" :style="styles"  v-show="mostrar_kuspit">
                <vue-highcharts
                    :options="options"
                    :loading="loading"
                    :resizable="true"
                    ref = 'highchart_kuspit'
                    @load="onLoad"
                    @resize="onResize"
                >
                </vue-highcharts>
            </div>
            <div class="highcharts" :style="styles"  v-show="mostrar_feudo">
                <vue-highcharts
                    :options="options"
                    :loading="loading"
                    :resizable="true"
                    ref = 'highchart_feudo'
                    @load="onLoad"
                    @resize="onResize"
                >
                </vue-highcharts>
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
import VueHighcharts from 'vue2-highcharts'
// import IHighCharts from 'vue-highcharts-v5/src/HighCharts.js'
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
      mostrar_axend: true,
      mostrar_kuspit: true,
      mostrar_feudo: false,
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
        xAxis: {
          lineWidth: 1,
          tickInterval: 1, // con este intervalo logro llegar a los 12 meses
          min: 1, // se establece el minimo del intervalo
          max: 12, // se establece el maximo en este caso 12 = 12 meses
          title: {
            text: ''
          }
        },
        yAxis: {
          min: 500,
          labels: {
            format: '{value} k'
          },
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
        series: []
      }
    }
  },
  methods: {
    onLoad (instance, HighCharts) {
      console.log(instance, HighCharts)
    },
    onResize (width, height) {
      console.log(width, height)
    },
    axend_button: function () {
      this.mostrar_axend = !this.mostrar_axend
      this.mostraruspit = !this.mostraruspit
    },
    kuspit_button: function () {
      this.mostrar_axend = this.mostrar_axend
      this.mostraruspit = !this.mostraruspit
    },
    feudo_button: function () {
      this.mostrar_feudo = !this.mostrar_feudo
    },
    getAxendResult (capitalInicial, ahorro, interes_axend) {
      let capitalRecopilada = 0
      let capitalFinal_1 = 0
      let capitalFinal_2 = 0
      let capitalFinal_3 = 0
      let capitalFinal_4 = 0
      let capitalFinal_5 = 0
      let capitalFinal_6 = 0
      let capitalFinal_7 = 0
      let capitalFinal_8 = 0
      let capitalFinal_9 = 0
      let capitalFinal_10 = 0
      let total = []
      for (let mes = 1; mes <= 10; mes++) {
        if (mes === 1) {
          capitalFinal_1 = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          total.push(capitalFinal_1)
          console.log(`mes 1: ${total}`)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_1
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_2 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_2)
          console.log(`mes 2: ${total}`)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_2
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_3 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_3)
          console.log(`mes 3: ${total}`)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_3
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_4 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_4)
          console.log(`mes 4: ${total}`)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_4
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_5 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_5)
          console.log(`mes 5: ${total}`)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_5
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_6 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_6)
          console.log(`mes 6: ${total}`)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_6
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_7 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_7)
          console.log(`mes 7: ${total}`)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_7
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_8 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_8)
          console.log(`mes 8: ${total}`)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_8
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_9 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_9)
          console.log(`mes 9: ${total}`)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_9
          capitalRecopilada = (capitalInicial + ahorro) * interes_axend / 100 + ahorro
          capitalFinal_10 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_10)
          console.log(`mes 10: ${total}`)
          continue
        }
      }
      return total
    },
    getChartData_axend (capitalInicial, ahorro, interes_axend) {
      let arrayData_axend = this.getAxendResult(capitalInicial, ahorro, interes_axend)
      return arrayData_axend
    },
    // Kuspit
    getKuspitResult (capitalInicial, ahorro, interes_kuspit) {
      let capitalRecopilada = 0
      let capitalFinal_1 = 0
      let capitalFinal_2 = 0
      let capitalFinal_3 = 0
      let capitalFinal_4 = 0
      let capitalFinal_5 = 0
      let capitalFinal_6 = 0
      let capitalFinal_7 = 0
      let capitalFinal_8 = 0
      let capitalFinal_9 = 0
      let capitalFinal_10 = 0
      let total = []
      for (let mes = 1; mes <= 10; mes++) {
        if (mes === 1) {
          capitalFinal_1 = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          total.push(capitalFinal_1)
          console.log(`mes 1: ${total}`)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_1
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_2 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_2)
          console.log(`mes 2: ${total}`)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_2
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_3 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_3)
          console.log(`mes 3: ${total}`)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_3
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_4 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_4)
          console.log(`mes 4: ${total}`)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_4
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_5 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_5)
          console.log(`mes 5: ${total}`)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_5
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_6 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_6)
          console.log(`mes 6: ${total}`)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_6
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_7 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_7)
          console.log(`mes 7: ${total}`)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_7
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_8 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_8)
          console.log(`mes 8: ${total}`)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_8
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_9 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_9)
          console.log(`mes 9: ${total}`)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_9
          capitalRecopilada = (capitalInicial + ahorro) * interes_kuspit / 100 + ahorro
          capitalFinal_10 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_10)
          console.log(`mes 10: ${total}`)
          continue
        }
      }
      return total
    },
    getChartData_kuspit (capitalInicial, ahorro, interes_kuspit) {
      let arrayData = this.getKuspitResult(capitalInicial, ahorro, interes_kuspit)
      console.log(arrayData)
      return arrayData
    },
    getFeudoResult (capitalInicial, ahorro, interes_feudo) {
      let capitalRecopilada = 0
      let capitalFinal_1 = 0
      let capitalFinal_2 = 0
      let capitalFinal_3 = 0
      let capitalFinal_4 = 0
      let capitalFinal_5 = 0
      let capitalFinal_6 = 0
      let capitalFinal_7 = 0
      let capitalFinal_8 = 0
      let capitalFinal_9 = 0
      let capitalFinal_10 = 0
      let total = []
      for (let mes = 1; mes <= 10; mes++) {
        if (mes === 1) {
          capitalFinal_1 = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          total.push(capitalFinal_1)
          console.log(`mes 1: ${total}`)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_1
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_2 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_2)
          console.log(`mes 2: ${total}`)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_2
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_3 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_3)
          console.log(`mes 3: ${total}`)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_3
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_4 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_4)
          console.log(`mes 4: ${total}`)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_4
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_5 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_5)
          console.log(`mes 5: ${total}`)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_5
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_6 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_6)
          console.log(`mes 6: ${total}`)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_6
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_7 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_7)
          console.log(`mes 7: ${total}`)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_7
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_8 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_8)
          console.log(`mes 8: ${total}`)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_8
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_9 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_9)
          console.log(`mes 9: ${total}`)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_9
          capitalRecopilada = (capitalInicial + ahorro) * interes_feudo / 100 + ahorro
          capitalFinal_10 = capitalRecopilada + capitalInicial
          total.push(capitalFinal_10)
          console.log(`mes 10: ${total}`)
          continue
        }
      }
      return total
    },
    getChartData_feudo (capitalInicial, ahorro, interes_feudo) {
      let arrayData = this.getFeudoResult(capitalInicial, ahorro, interes_feudo)
      console.log(arrayData)
      return arrayData
    },
    loadAxend () {
      var capitalInicial = this.form.capitalInicial
      var ahorro = this.CalcularAhorro
      const interes_axend = 1.25
      const interes_kuspit = 1.44
      const interes_feudo = 0
      let axendSeries = {
        name: 'Axend',
        data: this.getChartData_axend(capitalInicial, ahorro, interes_axend),
        color: '#e03757'
      }
      let kuspitSeries = {
        name: 'Kuspit',
        data: this.getChartData_kuspit(capitalInicial, ahorro, interes_kuspit),
        color: 'green'
      }
      let feudoSeries = {
        name: 'Feudo Capital',
        data: this.getChartData_feudo(capitalInicial, ahorro, interes_feudo),
        color: 'black'
      }
      this.$refs.highcharts_axend.addSeries(axendSeries)
      this.$refs.highchart_kuspit.addSeries(kuspitSeries)
      this.$refs.highchart_feudo.addSeries(feudoSeries)
    }
  },
  created () {
    setTimeout(() => {
      this.loadAxend()
    }, 2000)
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
    this.$store.dispatch('deuda/get', this.form.id)
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
      let totalEgresoM = this.form.deuda
      let ahorro = totalIngreso - totalEgresos - totalEgresoM
      // console.log(ahorro)
      return ahorro
    },
    PrintAhorro () {
      let ahorro = this.CalcularAhorro
      let value = ahorro
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintCapitalInicial () {
      return this.form.capitalInicial
    }
  },
  components: {
    VueHighcharts, QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QBtnDropdown, QList, QSelect, QListHeader, QItem, QItemSide, QItemTile, QItemSeparator, QItemMain, QSideLink, QCollapsible, CapturarMetas, CapturarIngreso, CapturarEgresos, CapturarCapitalInicial
  }
}
</script>
