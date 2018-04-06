<template>
  <div>
    <div class="container items-center correo center-align">
      <div class="content">
        <img src="~assets/img/moneyko-logo.svg" alt="MoneyKo">
        <h2>Crea tu cuenta para <br> visualizar tus datos.</h2>
        <div class="correo_input">
          <q-field>
            <q-input
              v-model="correo" type="text" placeholder="ejemplo@mail.com"
              :before="[
                {
                  icon: 'mail_outline'
                }
              ]"
            />
          </q-field>
          <q-field>
            <q-input
              v-model="password" type="password" placeholder="Minimo 8 caract."
              :before="[
                {
                  icon: 'lock_outline'
                }
              ]"
            />
          </q-field>
        </div>
        <button class="primary" v-bind:disabled="!isCorreoValid()">Continuar</button>
      </div>
    </div>

    <footer>
      <p>Todos los derechos reservados, Moneyko 2018.</p>
    </footer>
  </div>
</template>

<script>
import { QField, QInput } from 'quasar'

export default {
  data () {
    return {
      correo: '',
      password: ''
    }
  },
  methods: {
    isCorreoValid: function () {
      return this.correo !== '' && this.password !== ''
    }
  },
  components: {
    QField, QInput
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
    font-family: NunitoBold;
    src: url(~assets/fonts/Nunito/Nunito-Bold.ttf);
  }

  @font-face {
    font-family: Nunito;
    src: url(~assets/fonts/Nunito/Nunito-Regular.ttf);
  }

  @font-face {
    font-family: OpenSansSemibold;
    src: url(~assets/fonts/OpenSans/OpenSans-SemiBold.ttf);
  }

  $nunitobold: NunitoBold;
  $nunito: Nunito;
  $os-semibold: OpenSansSemibold;

  header {
    .q-toolbar {
      i {
        display: none !important;
      }
    }
  }

  .q-layout-page-container {
    padding: 0px !important;
  }

  .correo {
    font-family: $nunitobold;
    margin: 0px;
    padding: 50px 5% 90px 5%;
    width: 100%;
    display: flex;
    min-height: 100vh;
    height: auto;
    .content {
      width: 100%;
      h2 {
        font-size: 35px;
        font-weight: bold;
        line-height: 1.27;
        text-align: center;
        color: $dark-purple;
        margin-top: 13px;
        margin-bottom: 50px;
      }

      .correo_input {
        .q-field {
          text-align: left;
          margin-bottom: 25px;

          .q-if:before,
          .q-if:after {
            color: $dark-purple;
          }

          .q-input {
            position: relative;
            width: 50%;
            max-width: 350px;
            left: 50%;
            transform: translateX(-50%);

            .q-icon {
              color: $dark-purple !important;
              margin-right: 15px;
            }

            input {
              font-family: $os-semibold;
              color: $dark-purple;
              font-size: 16px;
              font-weight: 600;
              line-height: 1.56;
            }

            input::-webkit-input-placeholder {
              color: $dark-purple !important;
            }
            input::-moz-placeholder {
              color: $dark-purple;
            }
            input:-ms-input-placeholder {
              color: $dark-purple;
            }
            input:-moz-placeholder {
              color: $dark-purple;
            }
          }
        }
      }

      button {
        display: initial !important;
        font-family: $nunito;
        width: 300px;
        height: 50px;
        border-radius: 15px;
        border: 0px;
        outliner: 0;
        cursor: pointer;
        background-color: $light-blue;
        color: white;
        margin-bottom: 15px;
        font-weight: 500;
        font-size: 20px;
      }
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: $dark-purple;
    color: $white;
    text-align: center;

    p {
      font-family: $nunitobold;
      font-size: 14px;
      font-weight: bold;
      margin: 0px;
      line-height: 50px;
    }
  }

  @media screen and (max-width: 600px) {
    .correo {
      padding: 0 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .correo_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }

        button {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          border-radius: 0px;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }

  @media screen and (max-width: 415px) {
    .correo {
      .content {
        h2 {
          position: relative;
          width: 90%;
          left: 5%;
        }

        .correo_input {
          .q-field {
            .q-input {
              width: 95%;
            }
          }
        }
      }
    }
  }
</style>
