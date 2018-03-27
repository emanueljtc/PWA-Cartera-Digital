<template>
  <div>
    <div class="container items-center correo center-align">
      <div class="content">
        <img src="~assets/img/moneyko-logo.svg" alt="MoneyKo">
        <h2>Ingresa tus datos para ver tus resultados.</h2>
        <div class="correo_input">
          <q-field>
            <q-input
              v-model="text" type="text" placeholder="ejemplo@mail.com"
              :before="[
                {
                  icon: 'mail_outline'
                }
              ]"
            />
          </q-field>
          <q-field>
            <q-input
              v-model="text" type="password" placeholder="Minimo 8 caract."
              :before="[
                {
                  icon: 'lock_outline'
                }
              ]"
            />
          </q-field>
        </div>
        <button class="primary">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { QField, QInput } from 'quasar'

export default {
  components: {
    QField, QInput
  }
}
</script>

<style lang="scss">
  $green: #c0d84a;
  $dark-blue: #3f224c;
  $purple: #af85bc;
  $white: #ffffff;
  $blue-light: #64c9db;

  .correo {
    margin: 0px;
    padding: 0px;
    width: 100%;
    display: flex;
    min-height: calc(100vh - 91px);
    .content {
      width: 100%;
      h2 {
        font-size: 25px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.27;
        letter-spacing: normal;
        text-align: center;
        color: $dark-blue;
        margin-top: 13px;
        margin-bottom: 50px;
      }

      .correo_input {
        .q-field {
          text-align: left;
          margin-bottom: 25px;

          .q-if:before,
          .q-if:after {
            color: $dark-blue;
          }

          .q-input {
            position: relative;
            width: 50%;
            max-width: 350px;
            left: 50%;
            transform: translateX(-50%);

            .q-icon {
              color: $dark-blue !important;
              margin-right: 15px;
            }

            input {
              color: $dark-blue;
              font-size: 16px;
              font-weight: 600;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.56;
              letter-spacing: normal;
            }

            input::-webkit-input-placeholder {
              color: $dark-blue !important;
            }
            input::-moz-placeholder {
              color: $dark-blue;
            }
            input:-ms-input-placeholder {
              color: $dark-blue;
            }
            input:-moz-placeholder {
              color: $dark-blue;
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
        color: white;
        margin-bottom: 15px;
      }
    }
  }
</style>
