<template>
  <div>
    <div class="layout-padding container items-center login center-align">
      <div class="content">
        <img src="~assets/img/logo-moneyko-full.svg" alt="MoneyKo">
        <h2>Ingresa tus datos para iniciar sesiòn</h2>
          <div class="login_input">
              <q-field>
                  <q-input
                    v-model="form.username" type="email"
                    placeholder = "ejemplo@mail.com"
                    :before="[
                      {
                        icon: 'mail_outline'
                      }
                    ]"
                  />
              </q-field>
              <q-field>
                <q-input
                  v-model="form.password" type="password" placeholder="Minimo 8 caract."
                  :before="[
                    {
                      icon: 'lock_outline'
                    }
                  ]"
                />
              </q-field>
            </div>
             <button class="primary">Iniciar Sesión</button>
          </div>
      </div>
    </div>

</template>
<script>
import { QInput, QField, QBtn, QCard, QCardTitle, QCardMain, Notify } from 'quasar'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        username: null,
        password: null
      }
    }
  },
  mounted () {
    console.log('Login view Loaded!')
  },
  methods: {
    loginError () {
      Notify.create({
        message: 'Email or password incorrect',
        icon: 'lock',
        timeout: 2500,
        color: 'negative',
        textcolor: '#fff'
      })
    },
    async authenticate () {
      let username = this.form.username
      let password = this.form.password
      try {
        let authentication = await this.$oauth.login(username, password)
        await this.getCurrentUser()
        let redirection = '/' // Default route
        if (this.$route.query.redirect && authentication) {
          // If query has a prop redirect
          redirection = this.$route.query.redirect
        } else {
          // Otherwise redirect to default route
        }
        this.$router.replace(redirection)
      } catch (error) {
        // Error in Login
        console.log(error)
        this.loginError()
      }
    },
    ...mapActions('users', ['getCurrentUser', 'destroyCurrentUser'])

  },
  components: {
    QField,
    QInput,
    QBtn,
    QCard,
    QCardTitle,
    QCardMain
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
    display: none !important;
  }

  .q-layout-page-container {
    padding: 0px !important;
  }

  .login {
    font-family: $nunitobold;
    margin: 0px;
    padding: 50px 5% 100px 5%;
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

      .login_input {
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
      img {
        margin-left: 43%;
      }
      button {
        position: relative;
        font-family: Nunito;
        font-size: 20px;
        font-weight: 500;
        width: 300px;
        height: 50px;
        border-radius: 15px;
        color: white;
        border: 0px;
        cursor: pointer;
        margin-bottom: 15px;
        margin-top: 50px;
        margin-left: 38%;
      }
      .primary {
        background-color: $light-blue;
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
  @media screen and (max-width: 1200px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }

        button {
          position: relative;
          left: 35%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 1000px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }

        button {
          position: relative;
          left: 32%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 975px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }

        button {
          position: relative;
          left: 31%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 900px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }
        img {
          margin: auto 40%;
        }
        button {
          position: relative;
          left: 30%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 700px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }
        img {
          margin: auto 38%;
        }
        button {
          position: relative;
          left: 26%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 675px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }
        img {
          margin: auto 37%;
        }
        button {
          position: relative;
          left: 22%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }
        img {
          margin-left: 25%;
        }
        button {
          position: relative;
          left: 5%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 575px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }
        img {
          margin-left: 33%;
        }
        button {
          position: relative;
          left: 15%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 535px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }
        img {
          margin-left: 33%;
        }
        button {
          position: relative;
          left: 15%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    .login {
      padding: 50px 5%;
      .content {
        margin-bottom: 50px;
        h2 {
          position: relative;
          width: 80%;
          left: 10%;
          font-size: 25px;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 80%;
            }
          }
        }
        img {
          margin: auto 33%;
        }
        button {
          position: relative;
          left: 16%;
          bottom: 0;
          margin: 0px;
        }
      }
    }

    footer {
      display: none;
    }
  }
  @media screen and (max-width: 475px) {
    .login {
      .content {
        h2 {
          position: relative;
          width: 90%;
          left: 5%;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 95%;
            }
          }
        }
        img {
          margin: auto 29%;
        }
         button {
          position: relative;
          left: 14%;
          bottom: 0;
          margin: 0px;
        }
      }
    }
  }
  @media screen and (max-width: 440px) {
    .login {
      .content {
        h2 {
          position: relative;
          width: 90%;
          left: 5%;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 95%;
            }
          }
        }
        img {
          margin: auto 29%;
        }
         button {
          position: relative;
          left: 9%;
          bottom: 0;
          margin: 0px;
        }
      }
    }
  }
  @media screen and (max-width: 415px) {
    .login {
      .content {
        h2 {
          position: relative;
          width: 90%;
          left: 5%;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 95%;
            }
          }
        }
         button {
          position: relative;
          left: 9%;
          bottom: 0;
          margin: 0px;
        }
      }
    }
  }
  @media screen and (max-width: 375px) {
    .login {
      .content {
        h2 {
          position: relative;
          width: 90%;
          left: 5%;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 95%;
            }
          }
        }
         img {
           margin: auto 25%;
         }
         button {
          position: relative;
          left: 4%;
          bottom: 0;
          margin: 0px;
        }
      }
    }
  }
  @media screen and (max-width: 320px) {
    .login {
      .content {
        h2 {
          position: relative;
          width: 90%;
          left: 5%;
        }

        .login_input {
          .q-field {
            .q-input {
              width: 95%;
            }
          }
        }
         button {
          position: relative;
          left: -2%;
          bottom: 0;
          margin: 0px;
        }
      }
    }
  }
</style>
