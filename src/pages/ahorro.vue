<template>
<div>
    <div class="layout-padding center-align">
      <div class="container ahorros">
        <div class="content">
          <h1>Cómo se comporta tu ahorro a través del tiempo.</h1>
          <q-tabs>
            <!-- Tabs - notice slot="title" -->
            <q-tab slot="title" name="actual" label="Actual" @click.native="$router.replace('/diagnostico')" />
            <q-tab slot="title" name="recomendado" label="Ideal" @click.native="$router.replace('/presupuesto')" />
            <q-tab default slot="title" name="ahorro" label="Ahorro" />
            <q-tab slot="title" name="gastos" label="Gastos" @click.native="$router.replace('/gastos')" />
            <!-- Targets -->
            <q-tab-pane name="ahorro">
                <Ahorro />
            </q-tab-pane>
        </q-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ahorro from '../components/Ahorro'
import { QTabs, QTab, QTabPane, QRouteTab } from 'quasar'
export default {
  name: 'ahorro',
  data () {
    return {}
  },
  components: { QTabs, QTab, QTabPane, QRouteTab, Ahorro }
}
</script>

<style lang="scss">
$green: #c0d84a;
$yellow: #fbbb2f;
$orange: #fbbb40;
$pink: #e03757;
$dark-purple: #3f224c;
$link: #af85bc;
$light-blue: #64c9db;
$purple: #af85bc;
$white: #ffffff;
$gray: #eae7e7;
$gray-light: #fcfcfc;
$gray-button: #f6f6f6;
$btn-secondary: #c0d84a;

@font-face {
  font-family: Nunito;
  src: url(~assets/fonts/Nunito/Nunito-Regular.ttf);
}

@font-face {
  font-family: NunitoBold;
  src: url(~assets/fonts/Nunito/Nunito-Bold.ttf);
}

@font-face {
  font-family: OpenSans;
  src: url(~assets/fonts/OpenSans/OpenSans-Regular.ttf);
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
$opensans: OpenSans;
$os-semibold: OpenSansSemibold;
$os-bold: OpenSansBold;

header {
  display: block !important;
  background-color: $gray-light;

  .q-toolbar {
    background-color: $gray-light !important;

    .menu-icon {
      display: block;
    }
  }
}

.q-layout-page-container {
  padding: 0px !important;
  background-color: $gray-light;
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
        margin-bottom: 30px;
      }
      .q-tabs {
        .q-tabs-head {
          position: relative;
          left: 25%;
          width: 50%;
          border-bottom: 2px solid $gray;
          overflow: visible;
          background-color: $gray-light;

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

            .wrapper {
              position: relative;
              width: 50%;
              left: 25%;
            }

            .sub-title {
              font-family: $opensans;
              font-size: 18px;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.39;
              letter-spacing: normal;
              text-align: center;
              color: $dark-purple;
              margin: 0px;
            }
            .layer {
              font-family: $nunito;
              font-size: 40px;
              font-weight: bold;
              line-height: 0.63;
              text-align: center;
              color: $green;
              margin-top: 22px;
            }
            button {
              position: relative;
            }
            .buttons {
              position: relative;
              width: 100%;
              .btn {
                width: 100px;
                height: 40px;
                margin: auto;
                margin-top: 2%;
                border-style: none;
                border-radius: 10px;
                font-size: 16px;
                font-family: Opensans;
                color: $white;
                line-height: 1.56;
                font-weight: 600;
              }
              .btn-cero {
                width: 90px;
                background: $orange;
              }
              .btn-primary {
                width: 90px;
                background: $pink;
              }
              .btn-secondary {
                background: $green;
              }
              .btn-tree {
                color: $dark-purple;
                background: $gray;
                width: 115px;
              }
            }
            .grafica_ahorro {
              width: 100%;
              .vue-highcharts {
                border: 1px solid rgba(0, 0, 0, -0.9) !important;
                background: rgba(255, 255, 255, 0) !important;
                box-shadow: 0 0 45px rgba(0, 0, 0, -0.8) !important;
                tspan {
                  font-family: OpenSans;
                  font-size: 12px;
                  font-weight: bold;
                  font-style: normal;
                  font-stretch: normal;
                  line-height: 2.08;
                  letter-spacing: normal;
                  text-align: left;
                  color: $dark-purple;
                }
                .highcharts-background {
                  fill: transparent;
                }
              }
              .highcharts-loading {
                background-color: rgba(255, 255, 255, 0) !important;
              }
              .highcharts-credits,
              .highcharts-legend-item {
                display: none;
              }
              .meses {
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
                color: $dark-purple !important;
                position: relative;
                left: 0%;
                bottom: -57px;
              }
            }
            .tableInv {
              thead {
                tr {
                  background: $orange !important;
                }
              }
            }
            .tableAxend {
              thead {
                tr {
                  background: $pink !important;
                }
              }
            }
            .tableKuspit {
              thead {
                tr {
                  background: $green !important;
                }
              }
            }
            .tableFeudo {
              thead {
                tr {
                  background: $gray !important;
                  th.sortable {
                    color: $dark-purple !important;
                  }
                }
              }
            }
            .q-table-container {
              margin-top: -25px;
              border-radius: 0 !important;
              box-shadow: 0 1px 5px rgba(0, 0, 0, 0), 0 2px 2px rgba(0, 0, 0, 0),
                0 3px 1px -2px rgba(0, 0, 0, 0) !important;
            }
            .q-table {
              .relative-position {
                display: none;
              }
              thead {
                tr {
                  text-align: center;
                  th.sortable {
                    text-align: center;
                    font-family: OpenSans;
                    font-size: 12px;
                    font-weight: bold;
                    font-style: normal;
                    line-height: 2.08;
                    letter-spacing: normal;
                    font-stretch: normal;
                    color: $white;

                    i {
                      display: none;
                    }
                  }
                }
              }
              tbody {
                tr {
                  td {
                    text-align: center;
                  }
                }
              }
            }
            .items-center,
            .flex-center {
              display: none !important;
            }
            .alcance {
              margin-top: 30px;
              .alcance-text {
                font-family: OpenSans;
                font-size: 15px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.39;
                letter-spacing: normal;
                text-align: center;
                color: $dark-purple;
                margin: 0px;
              }
            }
            .meta {
              display: flex;
              justify-content: center;
              margin-top: 30px;
              .meta-text {
                text-align: right;
                margin: auto;
                font-size: 18px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.39;
                letter-spacing: normal;
                font-family: Opensans;
                padding-left: 75px;
                padding-right: 15px;
              }
              .meta-value {
                font-size: 17px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.39;
                letter-spacing: normal;
                font-family: Opensans;
                padding-left: 15px;
                text-align: left;
                position: relative;
              }
              i {
                border: 1px solid $orange;
                color: $orange;
                width: 27px;
                height: 27px;
                padding: 3px;
                border-radius: 20px;
                margin: auto;
                margin-right: 7px;
              }
            }
            .items-start {
              margin-top: 22px;
            }
            .q-if-label {
              color: $dark-purple !important;
            }
            .q-list {
              border: 0px solid !important;
            }
            .select {
              font-family: $nunito;
              font-size: 18px !important;
              font-weight: 600;
              text-align: left;
              width: 100%;
              max-width: 100%;
              min-height: 36px !important;
              padding-top: 12px;
              margin-top: -20px;
              margin-bottom: 20px;
              position: relative;
              flex-basis: 0;
              flex-grow: 1;
              min-width: 0;
              flex-wrap: nowrap;
              align-items: center;
              box-shadow: 0 1px 5px rgba(0, 0, 0, 0), 0 2px 2px rgba(0, 0, 0, 0),
                0 3px 1px -2px rgba(0, 0, 0, 0) !important;
              text-transform: none !important;
              border: 0px solid !important;
            }
            .q-item:hover {
              background-color: transparent;
            }
            .q-item-section {
              .q-item-label {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
            }
            .descriptions {
              padding: 15px 0px;
              text-align: justify;
            }
            .ver-ms {
              position: relative;
              font-family: OpenSans;
              font-size: 16px;
              font-weight: normal;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.39;
              letter-spacing: normal;
              text-align: left;
              color: $link;
            }
            .btn-next {
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
              margin-top: 50px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .layout-padding {
    .ahorros {
      .content {
        .q-tabs {
          .q-tabs-head {
            width: 80% !important;
            left: 10% !important;
          }
          .q-tabs-panes {
            .wrapper {
              width: 80% !important;
              left: 10% !important;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .layout-padding {
    .ahorros {
      .content {
        .q-tabs {
          .q-tabs-head {
            width: 100% !important;
            left: 0% !important;
          }
          .q-tabs-panes {
            .wrapper {
              width: 95% !important;
              left: 2.5% !important;

              .grafica_ahorro {
                display: flex;
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .layout-padding {
    .ahorros {
      padding: 100px 0;
      .content {
        .q-tabs {
          .q-tabs-panes {
            .wrapper {
              position: initial !important;
              width: 100% !important;
              padding: 0 25px;
            }
            .q-tab-pane {
              padding: 30px 0px;

              .highcharts {
                max-width: 100%;
              }

              .vue-highcharts {
                margin: 0;
              }
              .btn-next {
                position: absolute !important;
                width: 100% !important;
                left: 0 !important;
                bottom: 0 !important;
                border-radius: 0px !important;
                margin: 0px !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
