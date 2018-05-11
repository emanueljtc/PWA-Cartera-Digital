<template>
<div>
    <div class="layout-padding center-align">
      <div class="container ahorros">
        <div class="content">
          <h1>Ahorro</h1>
          <!-- <highcharts :options="options"></highcharts> -->
          <q-tabs>
            <!-- Tabs - notice slot="title" -->
            <q-tab slot="title" name="actual" label="Actual" />
            <q-tab slot="title" name="recomendado" label="Recomendado" />
            <q-tab default slot="title" name="ahorro" label="Ahorro" />
            <q-tab slot="title" name="gastos" label="Gastos" />
            <q-tab-pane name="ahorro">
                <p class="sub-title">Tu ahorro a largo plazo es de</p>
                <h2 class="layer">$500</h2>
                <div class="buttons">
                    <button class="btn btn-primary">Axend</button>
                    <button class="btn btn-secondary highcharts-series-1">Kuspit</button>
                    <button class="btn btn-tree">Feudo Capital</button>
                </div>
                <div class="grafica">
                <p class="meses" style="display: none">Meses</p>
                    <!-- <img src="../statics/graf.png"> -->
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
                  <p class="meta-value">{{ PrintMeta  }}</p>
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
                  <!-- <button class="next" @click="NextEgreso(), stophelp(), egresoExist = true" v-bind:disabled="!isEgresoValid()" icon-right="fas fa-arrow-right">Siguiente <i class="material-icons">arrow_forward</i></button> -->
                  <button type="submit" class="btn-next">Siguiente <i class="material-icons">arrow_forward</i></button>
            </q-tab-pane>
        </q-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        proposito: null
      },
      axend: JSON.parse(localStorage.getItem('ingreso') - 300 * 1.25),
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
          data: [4],
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
  },
  computed: {
    PrintMeta () {
      let value = this.form.meta
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintProposito () {
      return this.form.proposito
    }
  },
  components: {
    IHighCharts, QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QBtnDropdown, QList, QSelect, QListHeader, QItem, QItemSide, QItemTile, QItemSeparator, QItemMain, QSideLink, QCollapsible, CapturarMetas
  }
}
</script>

<style lang="scss">
$green: #c0d84a;
  $yellow: #fbbb2f;
  $pink: #e03757;
  $dark-purple: #3f224c;
  $link: #361a44;
  $purple: #af85bc;
  $light-blue: #64c9db;
  $white: #ffffff;
  $gray: #dedede;
  $gray-button: #f6f6f6;
  $btn-primary: #e03757;
  $btn-secondary: #c0d84a;
  $btn-tree: #f6f6f6;
  @font-face {
    font-family: Nunito;
    src: url(~assets/fonts/Nunito/Nunito-Regular.ttf);
  }

  @font-face {
    font-family: NunitoBold;
    src: url(~assets/fonts/Nunito/Nunito-Bold.ttf);
  }

  @font-face {
    font-family: OpenSansSemibold;
    src: url(~assets/fonts/OpenSans/OpenSans-SemiBold.ttf);
  }

  @font-face {
    font-family: OpenSansBold;
    src: url(~assets/fonts/OpenSans/OpenSans-Bold.ttf);
  }

  $nunito: Nunito;
  $nunitobold: NunitoBold;
  $os-semibold: OpenSansSemibold;
  $os-bold: OpenSansBold;
  header {
    display: block !important;
    background-color: #fcfcfc;

    .q-toolbar {
      background-color: #fcfcfc !important;

      .menu-icon {
        display: block;
      }
    }
  }
  .layout-padding {
    position: relative;
    padding: 0;
      .ahorros {
          min-height: 100vh;
          height: auto;
          padding: 100px 5% 100px 5%;
          .content {
              text-align: center;
              margin: 0;
              padding: 0;
              width: 100%;
              h1 {
              font-family: $nunitobold;
              font-size: 35px;
              color: $dark-purple;
              font-weight: bold;
              margin-bottom: 0px;
              margin-top: -100px;
              }
              .q-tabs{
                .q-tabs-head {
                  position: relative;
                  left: 25%;
                  width: 50%;
                  border-bottom: 2px solid $gray;
                  overflow: visible;
                  background-color: #fcfcfc;

                  .q-tabs-scroller {
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                    overflow: visible;
                    .q-tab {
                      font-family: $os-bold;
                      font-size: 14px;
                      font-weight: bold;
                      color: $gray;
                      text-transform: capitalize;

                      .q-tabs-bar {
                        color: $light-blue;
                        bottom: -2px;
                        border-bottom-width: 2px;
                      }
                    }

                    .q-tab.active {
                      color: $light-blue;
                    }
                  }
                }
              .q-tabs-panes {
              .q-tab-pane {
                border: none;
                padding: 30px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 50%;
                position: absolute;
                left: 25%;
                .sub-title{
                  height: 25px;
                  font-family: $os-bold;
                  font-size: 18px;
                  font-weight: normal;
                  font-style: normal;
                  font-stretch: normal;
                  line-height: 1.39;
                  letter-spacing: normal;
                  text-align: center;
                  color: $dark-purple;
                  margin-top: -3px;
                }
                .layer{
                /*  width: 156px;
                  height: 25px; */
                  font-family: $nunito;
                  font-size: 40px;
                  font-weight: bold;
                  line-height: 0.63;
                  text-align: center;
                  color: $green;
                  margin-top: 35px;
                }
                .buttons{
                  width: 100%;
                  .btn{
                    width: 100px;
                    height: 40px;
                    margin: auto;
                    margin-top: 30px;
                    border-style: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-family: Opensans;
                    color: white;
                    line-height: 1.56;
                    font-weight: 600;
                  }
                  .btn-primary{
                  width: 90px;
                  background: $btn-primary;
                  }
                  .btn-secondary{
                    background: $btn-secondary;
                  }
                  .btn-tree{
                    color: #3f224c;
                    background: $btn-tree;
                    width: 115px;
                  }
                }
                .grafica{
                  width: 100%;
                  margin-top: 40px;
                  .highcharts-loading{
                    background-color: rgba(255, 255, 255, 0) !important;
                  }
                  .highcharts-credits{
                    display: none;
                  }
                  .meses{
                    width: 38px;
                    height: 25px;
                    font-family: OpenSans;
                    font-size: 12px !important;
                    font-weight: bold;
                    font-style: normal;
                    font-stretch: normal;
                    line-height: 2.08;
                    letter-spacing: normal;
                    text-align: left;
                    color: #3f224c !important;
                    position: relative;
                    left: 0%;
                    bottom: -11px;
                  }
                }
                .meta{
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  text-align: center;
                  .meta-text{
                    text-align: center;
                    margin: auto;
                    margin-left: -5%;
                    font-size: 18px;
                    font-weight: normal;
                    font-style: normal;
                    font-stretch: normal;
                    line-height: 1.39;
                    letter-spacing: normal;
                    font-family: Opensans;
                  }
                  .meta-value{
                      text-align: right;
                      left: -40px;
                      top: 4px;
                      position: relative;
                  }
                  i {
                    border: 1px solid yellow;
                    color: yellow ;
                    width: 40px;
                    height: 25px;
                    padding: 2px;
                    border-radius: 20px;
                    position: relative;
                    top: 7px;
                    left: 6%;
                  }
              }
              .q-if-label{
                color: #3f224c !important;
              }
              .q-list{
                border: 0px solid !important;
              }
             .select{
                font-family: $nunito;
                font-size: 18px !important;
                font-weight: 600;
                text-align: left;
                width: 100%;
                float: left;
                left: 3% ;
                max-width: 100%;
                min-height: 36px !important;
                padding-top: 12px;
                position: relative;
                flex-basis: 0;
                flex-grow: 1;
                min-width: 0;
                flex-wrap: nowrap;
                align-items: center;
                box-shadow: 0 1px 5px rgba(0,0,0,0), 0 2px 2px rgba(0,0,0,0), 0 3px 1px -2px rgba(0,0,0,0) !important;
                text-transform: none !important;
                border: 0px solid !important;
              }
              .ver-ms{
               position: relative;
               font-family: OpenSans;
               font-size: 18px;
               font-weight: normal;
               font-style: normal;
               font-stretch: normal;
               line-height: 1.39;
               letter-spacing: normal;
               text-align: left;
               color: #af85bc;
              }
              .ver-ms-p{
                margin-left: 78%;
              }
              .ver-ms-lg{
                margin-left: 68%;
              }
              .btn-next{
                   position: relative;
                   font-family: Nunito;
                   font-size: 20px;
                   font-weight: 500;
                   width: 300px;
                   height: 50px;
                   border-radius: 15px;
                   background-color: #64c9db;
                   color: white;
                   border: 0px;
                   cursor: pointer;
                   margin-bottom: 15px;
                   margin-top: 18px;
                   margin-left: 25%;

              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    .q-tabs-panes {
      .q-tab-pane {
        width: 100% !important;
        left: 0 !important;
        .buttons{
          width: 110% !important;
          left: -18px;
          position: relative;
        }
        .grafica{
          position: relative !important;
          left: -12% !important;
          .meses{
            left: 3% !important;
          }
        }
        .ver-ms-p{
          margin-left: 45% !important;
        }
        .ver-ms-lg{
          margin-left: 22% !important;
        }
        .meta{
            i {
              left: -3% !important;
            }
          }
        .btn-next{
                width: 120% !important;
                height: 67px !important;
                /* margin: 0px !important; */
                border-radius: 0px !important;
                margin-left: -10% !important;
                margin-bottom: -10% !important;

        }
      }
    }
  }
</style>
