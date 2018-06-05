<template>
  <div>
    <div class="wrapper">
      {{ tabla_axendComputed }}
      {{ tabla_kuspitComputed }}
      {{ tabla_feudoComputed }}
      {{ tabla_sinComputed }}
      <p class="sub-title">Tu ahorro a largo plazo es de</p>
          <h2 class="layer" v-show="mostrar_SinInv" style="color: #fbbb40">{{ Print_Ahorro_LG_S_Inv }}</h2>
          <h2 class="layer" v-show="mostrar_axend" style="color: #e03757">{{ Print_Ahorro_LG_A }}</h2>
          <h2 class="layer" v-show="mostrar_kuspit">{{ Print_Ahorro_LG_K }}</h2>
          <h2 class="layer" v-show="mostrar_feudo" style="color: #727171">{{ Print_Ahorro_LG_F }}</h2>
           <div class="meta">
             <p class="meta-text"><i class="fas fa-star"></i>{{ PrintProposito }}</p>
             <p class="meta-value">{{ PrintMeta }}</p>
          </div>
          <div class="alcance">
            <p class="alcance-text">Para alcanzar tu meta necesitas <span style="color: #e03757; font-size: 20px" v-show="mostrar_axend">{{ meses_axend() }}</span><span style="color: #fbbb40; font-size: 20px" v-show="mostrar_SinInv">{{ meses_sin_inv() }}</span><span style="color: #c0d84a; font-size: 20px" v-show="mostrar_kuspit">{{ meses_kuspit() }}</span><span style="color: #727171; font-size: 20px" v-show="mostrar_feudo">{{ meses_feudo() }}</span> meses.</p>
          </div>
          <div class="buttons">
            <button class="btn btn-cero " @click="sinInv_button" >Sin Inv.</button>
            <button class="btn btn-primary " @click="axend_button" >Axend</button>
            <button class="btn btn-secondary highcharts-series-1" @click="kuspit_button">Kuspit</button>
            <button class="btn btn-tree" @click="feudo_button">Feudo Capital</button>
          </div>
          <div class="grafica_ahorro">
              <!-- <p class="meses">Meses</p> -->
              <div class="highcharts" :style="styles"  v-show="mostrar_SinInv">
                  <vue-highcharts
                      :options="options"
                      :loading="loading"
                      :resizable="true"
                      ref = 'highcharts_SinInversion'
                      @load="onLoad"
                      @resize="onResize"
                  >
                  </vue-highcharts>
              </div>
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
          <q-table
            title=""
            class="tableInv"
            :data="tableData_S_INV"
            :columns="columns"
            row-key="name"
            v-show="mostrar_SinInv"
            :pagination.sync="pagination"
          />
          <q-table
            title=""
            class="tableAxend"
            :data="tableData_Axend"
            :columns="columns"
            row-key="name"
            v-show="mostrar_axend"
            :pagination.sync="pagination"
          />
          <q-table
            title=""
            class="tableKuspit"
            :data="tableData_Kuspit"
            :columns="columns"
            row-key="name"
            v-show="mostrar_kuspit"
            :pagination.sync="pagination"
          />
          <q-table
            title=""
            class="tableFeudo"
            :data="tableData_Feudo"
            :columns="columns"
            row-key="name"
            v-show="mostrar_feudo"
            :pagination.sync="pagination"
          />
          <q-field>
              <q-list>
                  <q-collapsible label="Opciones de Inversión" close class="select">
                      <div>
                          <q-list link >
                              <q-item>
                                  <q-item-main>
                                      <q-item-tile label><a @click="descriptions_axend_buttons">Axend</a> <a href="#" class="ver-ms ver-ms-p">Ver más</a></q-item-tile>
                                      <p class="descriptions animated slideInDown" v-show="descriptions_axend">
                                       Axend es la plataforma global de inversiones alternativas, que conecta personas con sus oportunidades de inversión ideales: Préstamos Pyme, Persona-a-Persona, Proyectos Excluvisos, Bienes Raíces, con tipo de riesgo de desde F hasta doble A. Rendimiento promedio de 15% anualizado.
                                      </p>
                                  </q-item-main>
                              </q-item>
                              <q-item-separator inset />
                                  <q-item>
                                      <q-item-main>
                                          <q-item-tile label><a @click="descriptions_kuspit_buttons">Kuspit</a> <a href="#" class="ver-ms ver-ms-p">Ver más</a></q-item-tile>
                                          <p class="descriptions animated slideInDown" v-show="descriptions_kuspit">
                                            Invierte en un click… treídea, en donde estés… Applicación en donde te brinda una educación para invertir en la Bolsa. Inversiones desde 100 pesos. Tipo de Riesgo desde D hasta triple A. Rendimiento promedio de 17.25%
                                          </p>
                                      </q-item-main>
                                  </q-item>
                              <q-item-separator inset />
                                  <q-item>
                                      <q-item-main>
                                          <q-item-tile label><a @click="descriptions_feudo_buttons">Feudo Capital</a> <a href="#" class="ver-ms ver-ms-lg">Ver más</a></q-item-tile>
                                          <p class="descriptions animated slideInDown" v-show="descriptions_feudo">
                                            Podrás invertir de manera inteligente, inversión en bienes raíces. Capital destinado al financiamiento de construcciones y amenidades elite en México. Tipo de Riesgo desde B hasta triple A. Rendimiento promedio dentro de los términos y condiciones.
                                          </p>
                                      </q-item-main>
                                  </q-item>
                          </q-list>
                      </div>

                  </q-collapsible>
              </q-list>
          </q-field>
         <button type="submit" class="btn-next">Siguiente <i class="material-icons">arrow_forward</i></button>
    </div>
  </div>
</template>

<script>
import CapturarIngreso from '../components/CapturarIngreso'
import CapturarEgresos from '../components/CapturarEgresos'
import CapturarCapitalInicial from '../components/CapturarCapitalInicial'
import CapturarMetas from '../components/CapturarMetas'
import { QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QBtnDropdown, QList, QSelect, QListHeader, QItem, QItemSide, QItemTile, QItemSeparator, QItemMain, QSideLink, QCollapsible, QTable, QTh, QTr, QTd, QTableColumns } from 'quasar'
import VueHighcharts from 'vue2-highcharts'
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
      mostrar_SinInv: true,
      mostrar_axend: false,
      mostrar_kuspit: false,
      mostrar_feudo: false,
      descriptions_axend: true,
      descriptions_kuspit: true,
      descriptions_feudo: true,
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
          inverted: false,
          width: null,
          height: null
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
          max: 12, // se establece el maximo en este caso 12 meses
          title: {
            text: ''
          }
        },
        yAxis: {
          allowDecimals: true,
          labels: {
            format: '{value} k'
          },
          title: {
            text: ''
          }
        },
        tooltip: {
          pointFormat: '{point.y:.2f} $' // decimales
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true
            }
          }
        },
        series: []
      },
      pagination: {
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 12 // current rows per page being displayed
      },
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Capital I.',
          align: 'left',
          field: 'CI',
          sortable: true
        },
        {
          required: true,
          label: 'Ahorro R.',
          align: 'left',
          field: 'AR',
          sortable: true
        },
        {
          required: true,
          label: 'Interes',
          align: 'left',
          field: 'I',
          sortable: true
        },
        {
          required: true,
          label: 'Capital R.',
          align: 'left',
          field: 'CR',
          sortable: true
        },
        {
          required: true,
          label: 'Capital F.',
          align: 'left',
          field: 'CF',
          sortable: true
        }
      ],
      tableData_S_INV: [],
      tableData_Axend: [],
      tableData_Kuspit: [],
      tableData_Feudo: []
    }
  },
  methods: {
    onLoad (instance, HighCharts) {
      console.log(instance, HighCharts)
    },
    onResize (width, height) {
      console.log(width, height)
    },
    descriptions_axend_buttons: function () {
      this.descriptions_axend = !this.descriptions_axend
    },
    descriptions_kuspit_buttons: function () {
      this.descriptions_kuspit = !this.descriptions_kuspit
    },
    descriptions_feudo_buttons: function () {
      this.descriptions_feudo = !this.descriptions_feudo
    },
    sinInv_button: function () {
      this.mostrar_axend = false
      this.mostrar_kuspit = false
      this.mostrar_feudo = false
      this.mostrar_SinInv = true
    },
    axend_button: function () {
      this.mostrar_axend = true
      this.mostrar_kuspit = false
      this.mostrar_feudo = false
      this.mostrar_SinInv = false
    },
    kuspit_button: function () {
      this.mostrar_kuspit = true
      this.mostrar_feudo = false
      this.mostrar_axend = false
      this.mostrar_SinInv = false
    },
    feudo_button: function () {
      this.mostrar_kuspit = false
      this.mostrar_axend = false
      this.mostrar_feudo = true
      this.mostrar_SinInv = false
    },
    get_SinInversion_Result (capitalInicial, ahorro, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12) {
      let total = []
      let interes = 0
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return total
    },
    getChartData_SinInversion (capitalInicial, ahorro, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12) {
      let arrayData_axend = this.get_SinInversion_Result(capitalInicial, ahorro, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12)
      return arrayData_axend
    },
    getAxendResult (capitalInicial, ahorro, interes_axend, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12) {
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          console.log(`mes 0: ${capitalFinal_0}`)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          console.log(`mes 1: ${capitalFinal_1}`)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return total
    },
    getChartData_axend (capitalInicial, ahorro, interes_axend, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12) {
      let arrayData_axend = this.getAxendResult(capitalInicial, ahorro, interes_axend)
      return arrayData_axend
    },
    // Kuspit
    getKuspitResult (capitalInicial, ahorro, interes_kuspit, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12) {
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return total
    },
    getChartData_kuspit (capitalInicial, ahorro, interes_kuspit, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12) {
      let arrayData = this.getKuspitResult(capitalInicial, ahorro, interes_kuspit, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12)
      return arrayData
    },
    getFeudoResult (capitalInicial, ahorro, interes_feudo, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12) {
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return total
    },
    getChartData_feudo (capitalInicial, ahorro, interes_feudo, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12) {
      let arrayData = this.getFeudoResult(capitalInicial, ahorro, interes_feudo, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12)
      return arrayData
    },
    loadAxend () {
      var capitalInicial = this.form.capitalInicial
      var ahorro = this.CalcularAhorro
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      var interes_axend = 0
      var interes_kuspit = 0
      var interes_feudo = 0
      let SinInversion_Series = {
        name: 'Sin Inversion',
        data: this.getChartData_SinInversion(capitalInicial, ahorro, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12),
        color: '#fbbb40'
      }
      let axendSeries = {
        name: 'Axend',
        data: this.getChartData_axend(capitalInicial, ahorro, interes_axend, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12),
        color: '#e03757'
      }
      let kuspitSeries = {
        name: 'Kuspit',
        data: this.getChartData_kuspit(capitalInicial, ahorro, interes_kuspit, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12),
        color: '#c0d84a'
      }
      let feudoSeries = {
        name: 'Feudo Capital',
        data: this.getChartData_feudo(capitalInicial, ahorro, interes_feudo, capitalRecopilada, capitalFinal_0, capitalFinal_1, capitalFinal_2, capitalFinal_3, capitalFinal_4, capitalFinal_5, capitalFinal_6, capitalFinal_7, capitalFinal_8, capitalFinal_9, capitalFinal_10, capitalFinal_11, capitalFinal_12),
        color: '#737272'
      }
      this.$refs.highcharts_SinInversion.addSeries(SinInversion_Series)
      this.$refs.highcharts_axend.addSeries(axendSeries)
      this.$refs.highchart_kuspit.addSeries(kuspitSeries)
      this.$refs.highchart_feudo.addSeries(feudoSeries)
    },
    meses_sin_inv () {
      let Sin_Inv = this.Sin_Inv_M
      let Meta = this.form.meta
      let i = 0
      let mes = 0
      let MetaAlcanzada = false

      Sin_Inv.forEach(function (element) {
        if (element >= Meta) {
          if (MetaAlcanzada === false) {
            MetaAlcanzada = true
            mes = i
          }
        } else {
          i = i + 1
          mes = 'más de 12'
        }
      })
      return mes
    },
    meses_axend () {
      let Axend = this.Axend_M
      let Meta = this.form.meta
      let i = 0
      let mes = 0
      let MetaAlcanzada = false

      Axend.forEach(function (element) {
        if (element >= Meta) {
          if (MetaAlcanzada === false) {
            MetaAlcanzada = true
            mes = i
          }
        } else {
          i = i + 1
          mes = 'más de 12'
        }
      })
      return mes
    },
    meses_kuspit () {
      let Kuspit = this.Kuspit_M
      let Meta = this.form.meta
      let i = 0
      let mes = 0
      let MetaAlcanzada = false

      Kuspit.forEach(function (element) {
        if (element >= Meta) {
          if (MetaAlcanzada === false) {
            MetaAlcanzada = true
            mes = i
          }
        } else {
          i = i + 1
          mes = 'más de 12'
        }
      })
      return mes
    },
    meses_feudo () {
      let feudo = this.Feudo_M
      let Meta = this.form.meta
      let i = 0
      let mes = 0
      let MetaAlcanzada = false
      feudo.forEach(function (element) {
        if (element >= Meta) {
          if (MetaAlcanzada === false) {
            MetaAlcanzada = true
            mes = i
          }
        } else {
          i = i + 1
          mes = 'más de 12'
        }
      })
      return mes
    },
    tabla_axend () {
      let capitalInicial = this.form.capitalInicial
      console.log('d' + capitalInicial)
      let ahorro = this.CalcularAhorro
      let interes = (capitalInicial + ahorro) * 0.0125
      let cantidadRecopilada = ahorro + interes
      let cantidadFinal = capitalInicial + cantidadRecopilada

      let print_capitalInicial = parseFloat(capitalInicial).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_ahorro = parseFloat(ahorro).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_interes = parseFloat(interes).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_cantidadRecopilada = parseFloat(cantidadRecopilada).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_cantidadFinal = parseFloat(cantidadFinal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

      let add = {
        CI: null,
        AR: null,
        I: null,
        CR: null,
        CF: null
      }

      for (let i = 0; i < 12; i++) {
        add = {
          CI: print_capitalInicial,
          AR: print_ahorro,
          I: print_interes,
          CR: print_cantidadRecopilada,
          CF: print_cantidadFinal
        }

        if (capitalInicial !== null) {
          capitalInicial = cantidadFinal
          ahorro = this.CalcularAhorro
          interes = (capitalInicial + ahorro) * 0.0125
          cantidadRecopilada = ahorro + interes
          cantidadFinal = capitalInicial + cantidadRecopilada

          print_capitalInicial = parseFloat(capitalInicial).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_ahorro = parseFloat(ahorro).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_interes = parseFloat(interes).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_cantidadRecopilada = parseFloat(cantidadRecopilada).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_cantidadFinal = parseFloat(cantidadFinal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

          this.tableData_Axend.push(add)
        }
      }
    },
    tabla_kuspit () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      let interes = (capitalInicial + ahorro) * 0.014375
      let cantidadRecopilada = ahorro + interes
      let cantidadFinal = capitalInicial + cantidadRecopilada

      let print_capitalInicial = parseFloat(capitalInicial).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_ahorro = parseFloat(ahorro).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_interes = parseFloat(interes).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_cantidadRecopilada = parseFloat(cantidadRecopilada).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_cantidadFinal = parseFloat(cantidadFinal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

      let add = {
        CI: null,
        AR: null,
        I: null,
        CR: null,
        CF: null
      }

      for (let i = 0; i < 12; i++) {
        add = {
          CI: print_capitalInicial,
          AR: print_ahorro,
          I: print_interes,
          CR: print_cantidadRecopilada,
          CF: print_cantidadFinal
        }

        if (capitalInicial !== null) {
          capitalInicial = cantidadFinal
          ahorro = this.CalcularAhorro
          interes = (capitalInicial + ahorro) * 0.014375
          cantidadRecopilada = ahorro + interes
          cantidadFinal = capitalInicial + cantidadRecopilada

          print_capitalInicial = parseFloat(capitalInicial).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_ahorro = parseFloat(ahorro).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_interes = parseFloat(interes).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_cantidadRecopilada = parseFloat(cantidadRecopilada).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_cantidadFinal = parseFloat(cantidadFinal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

          this.tableData_Kuspit.push(add)
        }
      }
    },
    tabla_feudo () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      let interes = 0
      let cantidadRecopilada = ahorro + interes
      let cantidadFinal = capitalInicial + cantidadRecopilada

      let print_capitalInicial = parseFloat(capitalInicial).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_ahorro = parseFloat(ahorro).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_interes = parseFloat(interes).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_cantidadRecopilada = parseFloat(cantidadRecopilada).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_cantidadFinal = parseFloat(cantidadFinal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

      let add = {
        CI: null,
        AR: null,
        I: null,
        CR: null,
        CF: null
      }

      for (let i = 0; i < 12; i++) {
        add = {
          CI: print_capitalInicial,
          AR: print_ahorro,
          I: print_interes,
          CR: print_cantidadRecopilada,
          CF: print_cantidadFinal
        }

        if (capitalInicial !== null) {
          capitalInicial = cantidadFinal
          ahorro = this.CalcularAhorro
          interes = 0
          cantidadRecopilada = ahorro + interes
          cantidadFinal = capitalInicial + cantidadRecopilada

          print_capitalInicial = parseFloat(capitalInicial).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_ahorro = parseFloat(ahorro).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_interes = parseFloat(interes).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_cantidadRecopilada = parseFloat(cantidadRecopilada).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_cantidadFinal = parseFloat(cantidadFinal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

          this.tableData_Feudo.push(add)
        }
      }
    },
    tabla_sin () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      let interes = 0
      let cantidadRecopilada = ahorro + interes
      let cantidadFinal = capitalInicial + cantidadRecopilada

      let print_capitalInicial = parseFloat(capitalInicial).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_ahorro = parseFloat(ahorro).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_interes = parseFloat(interes).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_cantidadRecopilada = parseFloat(cantidadRecopilada).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      let print_cantidadFinal = parseFloat(cantidadFinal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

      let add = {
        CI: null,
        AR: null,
        I: null,
        CR: null,
        CF: null
      }

      for (let i = 0; i < 12; i++) {
        add = {
          CI: print_capitalInicial,
          AR: print_ahorro,
          I: print_interes,
          CR: print_cantidadRecopilada,
          CF: print_cantidadFinal
        }

        if (capitalInicial !== null) {
          capitalInicial = cantidadFinal
          ahorro = this.CalcularAhorro
          interes = 0
          cantidadRecopilada = ahorro + interes
          cantidadFinal = capitalInicial + cantidadRecopilada

          print_capitalInicial = parseFloat(capitalInicial).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_ahorro = parseFloat(ahorro).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_interes = parseFloat(interes).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_cantidadRecopilada = parseFloat(cantidadRecopilada).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
          print_cantidadFinal = parseFloat(cantidadFinal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

          this.tableData_S_INV.push(add)
        }
      }
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
      let value = this.form.ingreso
      let currencyNum = '$' + ' ' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintEgresos () {
      return this.form.egreso
    },
    CalcularAhorro () {
      let totalIngreso = this.form.ingreso
      let totalEgresos = this.form.egreso
      let totalEgresoM = this.form.deuda
      let ahorro = totalIngreso - totalEgresos - totalEgresoM
      return ahorro
    },
    Axend_M () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      var interes_axend = 0
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          console.log(`mes 0: ${capitalFinal_0}`)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          console.log(`mes 1: ${capitalFinal_1}`)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          // console.log(`mes 2: ${total}`)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          // console.log(`mes 3: ${total}`)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          // console.log(`mes 4: ${total}`)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          // console.log(`mes 5: ${total}`)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          // console.log(`mes 6: ${total}`)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          // console.log(`mes 7: ${total}`)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          // console.log(`mes 8: ${total}`)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          // console.log(`mes 9: ${total}`)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          // console.log(`mes 10: ${total}`)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          // console.log(`mes 10: ${total}`)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          // console.log(`mes 10: ${total}`)
          continue
        }
      }
      return total
    },
    Axend () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      var interes_axend = 0
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          console.log(`mes 0: ${capitalFinal_0}`)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          console.log(`mes 1: ${capitalFinal_1}`)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          // console.log(`mes 2: ${total}`)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          // console.log(`mes 3: ${total}`)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          // console.log(`mes 4: ${total}`)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          // console.log(`mes 5: ${total}`)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          // console.log(`mes 6: ${total}`)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          // console.log(`mes 7: ${total}`)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          // console.log(`mes 8: ${total}`)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          // console.log(`mes 9: ${total}`)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          // console.log(`mes 10: ${total}`)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          // console.log(`mes 10: ${total}`)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_axend = (capitalInicial + ahorro) * 0.0125
          capitalRecopilada = ahorro + interes_axend
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          // console.log(`mes 10: ${total}`)
          continue
        }
      }
      return capitalFinal_12
    },
    Print_Ahorro_LG_A () {
      let value = this.Axend
      let cantidad = '$' + ' ' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return cantidad
    },
    Kuspit_M () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      var interes_kuspit = 0
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return total
    },
    Kuspit () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      var interes_kuspit = 0
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_kuspit = (capitalInicial + ahorro) * 0.014375
          capitalRecopilada = ahorro + interes_kuspit
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return capitalFinal_12
    },
    Print_Ahorro_LG_K () {
      let value = this.Kuspit
      let cantidad = '$' + ' ' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return cantidad
    },
    Feudo_M () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      var interes_feudo = 0
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return total
    },
    Feudo () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      var interes_feudo = 0
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes_feudo = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes_feudo
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return capitalFinal_12
    },
    Print_Ahorro_LG_F () {
      let value = this.Feudo
      let cantidad = '$' + ' ' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return cantidad
    },
    Sin_Inv_M () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      let interes = 0
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return total
    },
    Sin_Inv () {
      let capitalInicial = this.form.capitalInicial
      let ahorro = this.CalcularAhorro
      let interes = 0
      let capitalRecopilada = 0
      let capitalFinal_0 = 0
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
      let capitalFinal_11 = 0
      let capitalFinal_12 = 0
      let total = []
      for (let mes = 1; mes <= 13; mes++) {
        if (mes === 1) {
          if (capitalInicial === 0) {
            capitalFinal_0 = 0
          }
          capitalFinal_0 = this.form.capitalInicial
          total.push(capitalFinal_0)
          continue
        }
        if (mes === 2) {
          capitalInicial = capitalFinal_0
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_1 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_1)
          continue
        }
        if (mes === 3) {
          capitalInicial = capitalFinal_1
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_2 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_2)
          continue
        }
        if (mes === 4) {
          capitalInicial = capitalFinal_2
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_3 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_3)
          continue
        }
        if (mes === 5) {
          capitalInicial = capitalFinal_3
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_4 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_4)
          continue
        }
        if (mes === 6) {
          capitalInicial = capitalFinal_4
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_5 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_5)
          continue
        }
        if (mes === 7) {
          capitalInicial = capitalFinal_5
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_6 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_6)
          continue
        }
        if (mes === 8) {
          capitalInicial = capitalFinal_6
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_7 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_7)
          continue
        }
        if (mes === 9) {
          capitalInicial = capitalFinal_7
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_8 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_8)
          continue
        }
        if (mes === 10) {
          capitalInicial = capitalFinal_8
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_9 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_9)
          continue
        }
        if (mes === 11) {
          capitalInicial = capitalFinal_9
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_10 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_10)
          continue
        }
        if (mes === 12) {
          capitalInicial = capitalFinal_10
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_11 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_11)
          continue
        }
        if (mes === 13) {
          capitalInicial = capitalFinal_11
          interes = (capitalInicial + ahorro) * 0
          capitalRecopilada = ahorro + interes
          capitalFinal_12 = capitalInicial + capitalRecopilada
          total.push(capitalFinal_12)
          continue
        }
      }
      return capitalFinal_12
    },
    Print_Ahorro_LG_S_Inv () {
      let value = this.Sin_Inv
      let cantidad = '$' + ' ' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return cantidad
    },
    PrintAhorro () {
      let ahorro = this.CalcularAhorro
      let value = ahorro * 1.24 / 100 * 100
      let currencyNum = '$' + ' ' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintCapitalInicial () {
      return this.form.capitalInicial
    },
    //
    tabla_axendComputed () {
      return this.tabla_axend()
    },
    tabla_kuspitComputed () {
      return this.tabla_kuspit()
    },
    tabla_feudoComputed () {
      return this.tabla_feudo()
    },
    tabla_sinComputed () {
      return this.tabla_sin()
    }
  },
  components: {
    VueHighcharts, QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QBtnDropdown, QList, QSelect, QListHeader, QItem, QItemSide, QItemTile, QItemSeparator, QItemMain, QSideLink, QCollapsible, CapturarMetas, CapturarIngreso, CapturarEgresos, CapturarCapitalInicial, QTable, QTh, QTr, QTd, QTableColumns
  }
}
</script>
