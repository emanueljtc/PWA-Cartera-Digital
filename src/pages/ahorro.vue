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
            <div class="grafica">
                <img src="../statics/graf.png">
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
        </q-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QSelect } from 'quasar'
import VueHighcharts from 'vue-highcharts'
export default {
  data () {
    return {
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
      ]
    }
  },
  components: {
    VueHighcharts, QTabs, QTab, QTabPane, QRouteTab, QField, QInput, QSelect
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
          }
        }
    }
  }
</style>
