<template>
<div>
    <div class="layout-padding center-align">
      <div class="container ahorros">
        <div class="content">
          <h1>Proyección</h1>
          <!-- <highcharts :options="options"></highcharts> -->
          <q-tabs>
            <!-- Tabs - notice slot="title" -->
            <q-tab slot="title" name="actual" label="Actual" @click.native="$router.replace('/diagnostico')" />
            <q-tab slot="title" name="recomendado" label="Recomendado" @click.native="$router.replace('/presupuesto')" />
            <q-tab default slot="title" name="ahorro" label="Ahorro" />
            <q-tab slot="title" name="gastos" label="Gastos" @click.native="$router.replace('/gastos')" />
            <q-tab-pane name="ahorro">
                <Ahorro></Ahorro>
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
    return {
    }
  },
  components: {QTabs, QTab, QTabPane, QRouteTab, Ahorro}
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
  $btn-tree: #eae7e7;
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
              margin-bottom: 30px;
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
                    margin-top: 2%;
                    border-style: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-family: Opensans;
                    color: white;
                    line-height: 1.56;
                    font-weight: 600;
                  }
                  .btn-cero{
                    width: 90px;
                    background: #fbbb40;
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
                  margin-top: -15px;
                  margin-bottom: -10%;
                  .vue-highcharts{
                    border: 1px solid rgba(0, 0, 0, -0.9) !important;
                    background: rgba(255, 255, 255, 0) !important;
                    box-shadow: 0 0 45px rgba(0, 0, 0, -0.8) !important;
                    tspan{
                      font-family: OpenSans;
                      font-size: 12px;
                      font-weight: bold;
                      font-style: normal;
                      font-stretch: normal;
                      line-height: 2.08;
                      letter-spacing: normal;
                      text-align: left;
                      color: #3f224c;
                    }
                  }
                  .highcharts-loading{
                    background-color: rgba(255, 255, 255, 0) !important;
                  }
                  .highcharts-credits, .highcharts-legend-item{
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
                    bottom: -57px;
                  }
                }
                .q-table-container {
                  border-radius: 0 !important;
                  box-shadow: 0 1px 5px rgba(0, 0, 0, 0), 0 2px 2px rgba(0, 0, 0, 0), 0 3px 1px -2px rgba(0, 0, 0, 0) !important;
                }
                .q-table {
                  .relative-position{
                    display: none;
                  }
                  thead {
                    tr {
                      background: #f0f0f0 !important;
                      th.sortable {
                        font-family: OpenSans;
                        font-size: 12px;
                        font-weight: bold;
                        font-style: normal;
                        line-height: 2.08;
                        letter-spacing: normal;
                        font-stretch: normal;
                        color: #585454;
                      }
                    }
                  }
                }
                .alcance {
                  margin-bottom: 5%;
                  margin-top: 15%;
                  .alcance-text{
                     font-family: OpenSans;
                     font-size: 15px;
                     font-weight: normal;
                     font-style: normal;
                     font-stretch: normal;
                     line-height: 1.39;
                     letter-spacing: normal;
                     text-align: center;
                     color: #3f224c;
                  }
                }
                .meta{
                  width: 90%;
                  display: inline-block;
                  position: absolute;
                  right: 15%;
                  margin-top: 2%;
                  .meta-text{
                    text-align: center;
                    margin: auto;
                    margin-left: -25%;
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
                    left: 10%;
                    top: -30px;
                    position: relative;
                  }
                  i {
                    border: 1px solid yellow;
                    color: yellow ;
                    width: 27px;
                    height: 27px;
                    padding: 3px;
                    border-radius: 20px;
                    margin: auto;
                    margin-right: 7px;
                  }
              }
              .items-start{
                margin-top: 22px;
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
                margin-top: -30px;
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
                margin-left: 62%;
              }
              .ver-ms-lg{
                margin-left: 59%;
              }
              .btn-next{
                   position: absolute;
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
                   margin-left: -20%;

              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .q-tabs-panes {
      .q-tab-pane {
        width: 100% !important;
        left: 0 !important;
        .meta{
            i {
              left: -3% !important;
            }
            .meta-text{
              margin-right: 50% !important;
              margin-left: -11% !important;
            }
            .meta-value{
              top: -30px !important;
              left: -5px !important;
            }
          }
      }
    }
  }
  @media screen and (max-width: 900px) {
    .q-tabs-panes {
      .q-tab-pane {
        width: 100% !important;
        left: 0 !important;
        .meta{
            i {
              left: -3% !important;
            }
            .meta-text{
              margin-right: 50% !important;
              margin-left: -11% !important;
            }
            .meta-value{
              top: -30px !important;
              left: -5px !important;
            }
          }
      }
    }
  }
  @media screen and (max-width: 800px) {
    .q-tabs-panes {
      .q-tab-pane {
        width: 100% !important;
        left: 0 !important;
        .meta{
            i {
              left: -3% !important;
            }
            .meta-text{
              margin-right: 50% !important;
              margin-left: -11% !important;
            }
            .meta-value{
              top: -30px !important;
              left: -5px !important;
            }
          }
      }
    }
  }
  @media screen and (max-width: 700px) {
    .q-tabs-panes {
      .q-tab-pane {
        width: 100% !important;
        left: 0 !important;
        .ver-ms-p{
          margin-left: 60% !important;
        }
        .ver-ms-lg{
          margin-left: 56% !important;
        }
        .meta{
            i {
              left: -3% !important;
            }
            .meta-text{
              margin-right: 50% !important;
              margin-left: -11% !important;
            }
            .meta-value{
              top: -30px !important;
              left: -5px !important;
            }
          }
        .btn-next{
                width: 102% !important;
                height: 67px !important;
                border-radius: 0px !important;
                margin-left: -50% !important;
                margin-bottom: -10% !important;

        }
      }
    }
  }
   @media screen and (max-width: 640px) {
    .q-tabs-panes {
      .q-tab-pane {
        width: 100% !important;
        left: 0 !important;
        .grafica{
          position: relative !important;
          // left: -12% !important;
          margin-bottom: -15% !important;
          .meses{
            left: 3% !important;
          }
        }
        .ver-ms-p{
          margin-left: 56% !important;
        }
        .ver-ms-lg{
          margin-left: 52% !important;
        }
        .meta{
            i {
              left: -3% !important;
            }
            .meta-text{
              margin-right: 50% !important;
              margin-left: -11% !important;
            }
            .meta-value{
              top: -30px !important;
              left: -5px !important;
            }
          }
        .btn-next{
                width: 102% !important;
                height: 67px !important;
                border-radius: 0px !important;
                margin-left: -50% !important;
                margin-bottom: -10% !important;

        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    .q-tabs-panes {
      .q-tab-pane {
        width: 100% !important;
        left: 0 !important;
        .grafica{
          position: relative !important;
          // left: -12% !important;
          margin-bottom: -20% !important;
          .meses{
            left: 3% !important;
          }
        }
        .ver-ms-p{
          margin-left: 52% !important;
        }
        .ver-ms-lg{
          margin-left: 48% !important;
        }
        .meta{
            i {
              left: -3% !important;
            }
            .meta-text{
              margin-right: 50% !important;
              margin-left: -11% !important;
            }
            .meta-value{
              top: -30px !important;
              left: -5px !important;
            }
          }
        .btn-next{
                width: 102% !important;
                height: 67px !important;
                border-radius: 0px !important;
                margin-left: -50% !important;
                margin-bottom: -10% !important;

        }
      }
    }
  }
  @media only screen and (max-width: 500px) {
    .q-tabs-panes {
      .q-tab-pane {
        .ver-ms-p{
          margin-left: 30% !important;
        }
        .ver-ms-lg{
          margin-left: 24% !important;
        }
      }
    }
  }
  @media only screen and (max-width: 450px) {
    .q-tabs-panes {
      .q-tab-pane {
        .ver-ms-p{
          margin-left: 30% !important;
        }
        .ver-ms-lg{
          margin-left: 24% !important;
        }
      }
    }
  }
  @media only screen and (max-width: 430px) {
    .q-tabs-panes {
      .q-tab-pane {
        .ver-ms-p{
          margin-left: 24% !important;
        }
        .ver-ms-lg{
          margin-left: 17% !important;
        }
      }
    }
  }
</style>
