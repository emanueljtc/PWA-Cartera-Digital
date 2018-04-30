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
                    <button class="btn btn-primary">Pagaré</button>
                    <button class="btn btn-secondary">Inv. Plazos</button>
                    <button class="btn btn-tree">CETES</button>
                </div>
                <div class="grafica">
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
                  <p class="meta-text">Viaje a México</p>
                  <p class="meta-value">$3,000</p>
                </div>
                <q-field>
                    <q-select
                      class="select"
                      v-model="form_inversion.inv"
                      :options="selectOptions"
                      float-label="Opciones de Inversión"
                    />
                  </q-field>
                  <!-- <button class="next" @click="NextEgreso(), stophelp(), egresoExist = true" v-bind:disabled="!isEgresoValid()" icon-right="fas fa-arrow-right">Siguiente <i class="material-icons">arrow_forward</i></button> -->
                  <button type="submit" class="btn-next">Siguiente</button>
            </q-tab-pane>
        </q-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QSelect } from 'quasar'
import IHighCharts from 'vue-highcharts-v5/src/HighCharts.js'
export default {
  data: () => ({
    form_inversion: {
      inv: null
    },
    selectOptions: [
      {
        label: 'Axend',
        value: 'Axend'
      },
      {
        label: 'Kuspit',
        value: 'Kuspit'
      },
      {
        label: 'FeudoCapital',
        value: 'Feudo Capital'
      }
    ],
    styles: {},
    loading: true,
    options: {
      chart: {
        type: 'spline'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      yAxis: {
        title: {
          text: 'meses'
        }
      },
      xAxis: {
        title: {
          text: ''
        }
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Instalacion',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        color: '#e03757'
      }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
        color: '#c0d84a'
      }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
        color: '#cdcdcd'
      }]
    }
  }),
  methods: {
    onLoad (instance, HighCharts) {
      console.log(instance, HighCharts)
    },
    onResize (width, height) {
      console.log(width, height)
    }
  },
  components: {
    IHighCharts, QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QSelect
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
                }
              }
              .grafica{
                width: 100%;
                .highcharts-loading{
                  background-color: rgba(255, 255, 255, 0) !important;
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
                  margin-left: 20%;
                  font-size: 17px;
                  font-family: Opensans;
                }
                .meta-value{
                    text-align: right ;
                }
                i {
                  border: 1px solid yellow;
                  color: yellow ;
                  width: 40px;
                  height: 25px;
                  padding: 2px;
                  border-radius: 20px;
                }
            }
            .select{
              font-family: $nunito;
              font-size: 20px;
              min-width: 95%;
              font-weight: bold;
            }
            .btn-next{
              position: absolute;
              bottom: 0;
              left: 0;
              top: 100%;
              width: 100%;
              height: 67px;
              margin: 0px !important;
              border-radius: 0px;
              border-style: none;
              background-color: #64c9db;
              color: white;
              font-size: 20px;
              font-weight: 500;
              line-height: 1.25;
              font-family: $nunito;
            }
          }
        }
      }
    }
  }
}
</style>
