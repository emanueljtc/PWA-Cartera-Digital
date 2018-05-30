<template>
  <div>
    <div class="layout-padding center-align">
      <div class="container presupuesto">
        <div class="content">
          <h1>Diagnóstico Actual</h1>
          <q-tabs>
          <!-- Tabs - notice slot="title" -->
          <q-tab default slot="title" name="actual" label="Actual" />
          <q-tab slot="title" name="recomendado" label="Ideal" @click.native="$router.replace('/presupuesto')" />
          <q-tab slot="title" name="ahorro" label="Ahorro" @click.native="$router.replace('/ahorro')" />
          <q-tab slot="title" name="gastos" label="Gastos" @click.native="$router.replace('/gastos')" />

          <!-- Targets -->
          <q-tab-pane name="actual">
            <presupuesto-actual />
          </q-tab-pane>
        </q-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PresupuestoActual from 'src/components/PresupuestoActual'
import { QTabs, QTab, QTabPane, QRouteTab } from 'quasar'

export default {
  name: 'Presupuesto',
  data () {
    return {}
  },
  components: {
    QTabs, QTab, QTabPane, QRouteTab, PresupuestoActual
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

  .element-one {
    color: #64c9db !important;
  }

  .element-two {
    color: #c0d84a !important;
  }

  .element-three {
    color: #e03757 !important;
  }

  .element-four {
    color: #59ba70 !important;
  }

  .element-five {
    color: #af85bc !important;
  }

  .element-six {
    color: #fbbb2f !important;
  }

  .element-seven {
    color: #6179bb !important;
  }

  .element-eight {
    color: #7cb5ec !important;
  }

  .element-nine {
    color: #434348 !important;
  }

  .element-ten {
    color: #90ed7d !important;
  }

  .element-eleven {
    color: #f7a35c !important;
  }

  .element-twelve {
    color: #8085e9 !important;
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

                .vue-highcharts {
                  margin: 0px;
                  padding: 0px;
                  box-shadow: none;
                  background-color: #fcfcfc;
                  border: none;

                  .highcharts-container {
                    height: 260px !important;
                  }

                  .highcharts-credits,
                  .highcharts-label,
                  .highcharts-data-label-connector {
                    display: none;
                  }
                }

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
                    background-color: #fcfcfc;
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
                  margin: 10px 0px;

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

  .gastos-mayor {
    position: relative;
    height: auto;
    margin: 0px;
    width: 100%;

    .content {
      width: 100%;
      h2 {
        font-family: $nunitobold;
        font-size: 35px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.27;
        letter-spacing: normal;
        text-align: center;
        color: $dark-purple;
        margin-bottom: 50px;
      }

      .circulos {
        position: relative;
        width: 100%;
        min-height: 200px;
        height: auto;
        display: flex;
        justify-content: center;

        .tu-precio, .precio-bajo {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 100px;
          background: green;
          display: flex;

          p {
            font-family: $os-semibold;
            width: auto;
            margin: 0 15%;
            color: $white;
            font-size: 18px;
            font-weight: 600;
            font-style: normal;
            line-height: 1.56;
            letter-spacing: normal;
            text-align: center;
          }
        }

        .tu-precio {
          background-color: rgba(63, 34, 76, 0.7);
          margin-right: -35px;
        }

        .precio-bajo {
          background-color: rgba(224, 55, 87, 0.7);
          margin-left: -35px;
          justify-content: flex-end;
        }
      }

      .arrow {
        font-size: 35px;
        color: $dark-purple;
        margin-bottom: 40px;
      }

      .ahorro {
        p {
          font-family: $opensans;
          color: $dark-purple;
          font-size: 18px;
          font-weight: normal;
          line-height: 1.39;
          margin: 0;

          span {
            font-family: $nunitobold;
            font-size: 60px;
            font-weight: bold;
            color: $green;
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

  @media screen and (max-width: 500px) {
    .gastos-mayor {
      padding: 0 5%;
      padding-bottom: 50px;
      .content {
        h2 {
          font-size: 25px !important;
        }

        .circulos {
          min-height: 150px;
          .tu-precio, .precio-bajo {
            p {
              font-size: 16px;
            }
          }

          .tu-precio {
            margin-right: -15px;
          }

          .precio-bajo {
            margin-left: -15px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 400px) {
    .gastos-mayor {
      .content {
        .circulos {
          .tu-precio,
          .precio-bajo {
            width: 150px;
            height: 150px;
          }
        }
      }
    }
  }
</style>
