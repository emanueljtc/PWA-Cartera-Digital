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
          <p class="sub-title">Tu ahorro a largo plazo es de</p>
          <h2 class="layer">$500</h2>
          <div class="buttons">
              <button class="btn btn-primary">Pagaré</button>
              <button class="btn btn-secondary">Inv. Plazos</button>
              <button class="btn btn-tree">CETES</button>
          </div>
        </q-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QTabs, QTab, QTabPane, QRouteTab } from 'quasar'
import VueHighcharts from 'vue-highcharts'
export default {
  data () {
    return {
    }
  },
  components: {
    VueHighcharts, QTabs, QTab, QTabPane, QRouteTab
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
             margin-bottom: 30px;
            }
        }
    }
     .q-tabs {
          .sub-title{
            // width: 340px;
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
            margin-top: 35px;
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
                }
              }
            }
          }
        }
  }

</style>
