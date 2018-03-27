<template>
  <div>
    <div class="container metas center-align">
      <div class="content">
        <h2>Metas</h2>
        <p>¿Tienes una meta financiera?</p>
        <div class="input-field center-align">
          <q-btn @click="metaExist = true" label="Si"/>
          <q-btn @click="metaExist = false" label="No"/>
        </div>
        <div class="metas_desglose" v-if="metaExist">
          <div class="cuanto-meta">
            <h2>¿De cuánto?</h2>
            <q-field>
              <q-input v-model="meta" type="number" prefix="$" placeholder="3,000.00"/>
            </q-field>
          </div>
          <div class="para-meta">
            <h2>¿Para qué?</h2>
            <q-field>
              <q-input v-model="metaProposito" type="text" placeholder="Ejemplo. Viaje a méxico"/>
            </q-field>
          </div>
        </div>
        <button class="next">Ver resultados</button>
      </div>
    </div>
  </div>
</template>

<script>
import { QField, QInput, QBtn } from 'quasar'

export default {
  data () {
    return {
      meta: '',
      metaProposito: '',
      metaExist: false
    }
  },
  components: {
    QField, QInput, QBtn
  }
}
</script>

<style lang="scss">
  $green: #c0d84a;
  $dark-blue: #3f224c;
  $purple: #af85bc;
  $white: #ffffff;
  $blue-light: #64c9db;

  .metas {
    width: 100%;
    margin-top: 25px;

    .content {
      h2 {
        font-size: 25px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.27;
        letter-spacing: normal;
        text-align: center;
        color: $dark-blue;
        margin: 0px;
        margin-bottom: 5px;
      }

      p {
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.25;
        letter-spacing: normal;
        text-align: center;
        color: $dark-blue;
        margin: 0px;
        margin-bottom: 30px;
      }

      .q-btn {
        display: inline-block;
        background-color: #f6f6f6;
        color: $dark-blue;
        border-radius: 5px;
        padding: 0px 15px;
        cursor: pointer;
        width: 120px;
        height: 40px;
        text-align: center;
        margin: 15px 7.5px;
      }

      .q-btn:hover,
      .q-btn:focus {
        background-color: #af85bc;
        color: $white;
      }

      .metas_desglose {
        margin-top: 40px;

        .cuanto-meta {
          .q-if-addon,
          .q-if-focused {
            color: $green !important;
            font-size: 50px;
            margin: 0 5px;
          }

          .q-input {
            max-width: 300px;
            display: inline-block !important;
            float: none !important;

           input {
             color: $green;
             font-size: 60px;
             font-weight: bold;
             font-style: normal;
             font-stretch: normal;
             letter-spacing: normal;
             text-align: left;
             line-height: initial;
             height: auto;
           }

           input::-webkit-input-placeholder {
             color: $green !important;
           }

           input::-moz-placeholder {
             color: $green;
           }

           input::-ms-input-placeholder {
             color: $green;
           }

           input:-moz-placeholder {
             color: $green;
           }
          }
        }

        .para-meta {
          h2 {
            margin-top: 40px;
            margin-bottom: 20px;
          }

          .q-if:before,
          .q-if:after {
            color: $dark-blue;
          }

          .q-input {
            max-width: 350px;
            display: inline-block !important;
            float: none !important;

            input {
              font-size: 16px;
              color: $dark-blue;
              line-height: 1.56px;
              text-align: center;
            }

            input::-webkit-input-placeholder {
              color: #dedede !important;
            }

            input::-moz-placeholder {
              color: #dedede;
            }

            input::-ms-input-placeholder {
              color: #dedede;
            }

            input:-moz-placeholder {
              color: #dedede;
            }
          }
        }
      }

      button {
        width: 300px;
        height: 50px;
        border-radius: 15px;
        border: 0px;
        outliner: 0;
        cursor: pointer;
        background-color: $blue-light;
        color: $white;
        margin-bottom: 15px;
        margin-top: 25px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .metas {
      padding: 0 5%;

      p {
        font-size: 18px !important;
      }

      .content {
        .metas_desglose {
          .cuanto-meta {
            .q-input {
              input {
                text-align: center;
                font-size: 50px;
              }
            }
          }
        }

        .next {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          border-radius: 0px;
          margin: 0px;
        }
      }
    }
  }
</style>
