<template>
  <div>
    <div class="layout-padding center-align">
      <div class="container presupuesto">
        <div class="content">
          <h1>Presupuesto</h1>
          <!-- <highcharts :options="options"></highcharts> -->
          <q-tabs>
          <!-- Tabs - notice slot="title" -->
          <q-tab default slot="title" name="actual" label="Actual" />
          <q-tab slot="title" name="recomendado" label="Recomendado" />
          <q-tab slot="title" name="ahorro" label="Ahorro" />
          <q-tab slot="title" name="gastos" label="Gastos" />

          <!-- Targets -->
          <q-tab-pane name="actual">
            <div class="grafica">
              <!-- <p class="total">Total: $10,000.00</p> -->
              <p class="total"><span>Total:</span> <vue-autonumeric v-model="ingreso" :options="{currencySymbol: '$'}" disabled /></p>
            </div>
            <div v-for="(egreso, key) in egresos" :key="key">
              <div class="data-box">
                <div class="data">
                  <p class="porcentaje"><span>{{ porcentajeEgresos(egreso) }}%</span> {{ egreso.egreso }}</p>
                  <p class="cantidad"> <vue-autonumeric v-model="egreso.cantidad" :options="{currencySymbol: '$'}" disabled /> </p>
                </div>
              </div>
            </div>
            <div v-if="deuda !== null">
              <div class="data-box">
                <div class="data">
                  <p class="porcentaje"><span>{{ porcentajeDeuda() }}%</span> Deuda</p>
                  <p class="cantidad"><vue-autonumeric v-model="deuda" :options="{currencySymbol: '$'}" disabled /></p>
                </div>
              </div>
            </div>
            <div v-if="ahorro !== null">
              <div class="data-box">
                <div class="data">
                  <p class="porcentaje"><span>40%</span> Ahorro</p>
                  <p class="cantidad"><vue-autonumeric v-model="ahorro" :options="{currencySymbol: '$'}" disabled /></p>
                </div>
              </div>
            </div>
             <button>Ver mi meta <i class="material-icons">arrow_forward</i></button>
          </q-tab-pane>
          <q-tab-pane name="recomendado">Recomendado</q-tab-pane>
          <q-tab-pane name="ahorro">Ahorro</q-tab-pane>
          <q-tab-pane name="gastos">Gastos</q-tab-pane>
        </q-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QTabs, QTab, QTabPane, QRouteTab } from 'quasar'
import VueHighcharts from 'vue-highcharts'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'

export default {
  name: 'Presupuesto',
  data () {
    return {
      ingreso: this.ingreso,
      egresos: this.egresos,
      gastos: this.gastos,
      deuda: this.deuda,
      frecuenciaDeuda: this.frecuenciaDeuda,
      cantidadDeuda: this.cantidadDeuda,
      meta: this.meta,
      cantidadMeta: this.cantidadMeta,
      ahorro: null
    }
  },
  methods: {
    porcentajeEgresos (egreso) {
      const porcentajeE = Math.round((egreso.cantidad * 100) / this.ingreso)
      return porcentajeE
    },
    porcentajeDeuda () {
      const porcentajeD = Math.round((this.deuda * 100) / this.ingreso)
      return porcentajeD
    }
    // calcularAhorro () {
    //   let total = []
    //   Object.entries(this.egresos).forEach(function (element, index) {
    //     total.push(element.cantidad)
    //   })
    //   return total
    // }
  },
  mounted () {
    this.ingreso = JSON.parse(localStorage.getItem('ingreso'))
    this.egresos = JSON.parse(localStorage.getItem('egresos'))
    this.gastos = JSON.parse(localStorage.getItem('gastos'))
    this.deuda = JSON.parse(localStorage.getItem('deuda'))
    this.frecuenciaDeuda = JSON.parse(localStorage.getItem('frecuencia de la deuda'))
    this.cantidadDeuda = JSON.parse(localStorage.getItem('cantidad de la deuda'))
    this.meta = JSON.parse(localStorage.getItem('meta'))
    this.cantidadMeta = JSON.parse(localStorage.getItem('cantidad de la meta'))
  },
  components: {
    VueHighcharts, QTabs, QTab, QTabPane, QRouteTab, VueAutonumeric
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

  button {
    position: relative;
    font-family: $nunito;
    font-size: 20px;
    font-weight: 500;
    width: 300px;
    height: 50px;
    border-radius: 15px;
    background-color: $light-blue;
    color: white;
    border: 0px;
    outliner: 0;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 50px;

    i {
      position: relative;
      top: 5px;
    }
  }

  .q-layout-page-container {
    padding: 0px !important;
    background-color: #fcfcfc;
  }

  .layout-padding {
    position: relative;
    padding: 0;
    .presupuesto {
      min-height: 100vh;
      height: auto;
      padding: 100px 5% 100px 5%;

      .content {
        text-align: center;
        margin: 0px;
        padding: 0px;
        width: 100%;

        h1 {
          font-family: $nunitobold;
          font-size: 35px;
          color: $dark-purple;
          font-weight: bold;
          margin-bottom: 30px;
        }

        .q-tabs {
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

              .grafica {
                margin-bottom: 50px;

                .total {
                  font-family: $nunitobold;
                  font-size: 20px;
                  font-weight: bold;
                  color: $dark-purple;

                  span {
                    margin-left: 12px;
                  }

                  input,
                  textarea:disabled {
                    width: 130px;
                    background-color: $white;
                    color: $dark-purple;
                    border: none;
                    opacity: 1 !important;
                    cursor: default !important;
                    text-align: center;
                  }
                }
              }

              .data-box {
                position: relative;
                width: 50%;
                background-color: $white;
                display: inline-block;
                padding: 0 15px;
                border-radius: 7px;
                margin-bottom: 12px;

                .porcentaje, .cantidad {
                  position: relative;
                  font-family: $os-semibold;
                  font-size: 18px;
                  font-weight: 600;
                  color: $dark-purple;
                  width: auto;

                  span {
                    position: absolute;
                    left: 0;
                    color: $light-blue;
                  }
                }

                .porcentaje {
                  float: left;
                  padding-left: 60px;
                }

                .cantidad {
                  float: right;

                  input,
                  textarea:disabled {
                    position: relative;
                    width: 150px;
                    background-color: $white;
                    color: $dark-purple;
                    border: none;
                    opacity: 1 !important;
                    cursor: default !important;
                    text-align: right;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .layout-padding {
      .presupuesto {
        .content {
          .q-tabs {
            .q-tabs-head {
              width: 80% !important;
              left: 10% !important;
            }
            .q-tabs-panes {
              .q-tab-pane {
                .data-box {
                  width: 80%;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    button {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      border-radius: 0px;
      margin: 0px;
    }

    .layout-padding {
      .presupuesto {
        .content {
          .q-tabs {
            .q-tabs-head {
              width: 100% !important;
              left: 0% !important;
            }
            .q-tabs-panes {
              .q-tab-pane {
                padding: 30px 0;
                .data-box {
                  width: 100%;

                  .porcentaje, .cantidad {
                    font-size: 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
