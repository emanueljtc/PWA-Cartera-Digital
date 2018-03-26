<template>
  <div>
    <div class="container metas center-align">
      <div class="content">
        <h2>Metas</h2>
        <p>¿Tienes una meta financiera?</p>
        <div class="input-field center-align">
          <q-btn label="Si"/>
          <q-btn label="No"/>
        </div>
        <div class="metas_desglose">
          <div class="cuanto-meta">
            <h2>¿De cuánto?</h2>
            <q-field>
              <q-input type="number" prefix="$" placeholder="0.00"/>
            </q-field>
          </div>
          <div class="para-meta">
            <h2>¿Para qué?</h2>
            <q-field>
              <q-input type="text" placeholder="Ejemplo. Viaje a méxico"/>
            </q-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QField, QInput, QBtn } from 'quasar'

export default {
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

  .metas {
    margin: 0px;
    padding: 0px;
    float: left;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;

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
            max-width: 350px;
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
    }
  }
</style>
