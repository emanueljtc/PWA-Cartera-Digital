<template>
  <div>
    <div class="layout-padding center-align">
      <div class="container welcome">
        <div class="content">
          <img src="~assets/img/moneyko.svg" alt="MoneyKo">
          <!-- <img src="~assets/img/moneyko-logo.svg" alt="MoneyKo"> -->
          <!-- <h1>Bienvenido</h1> -->
          <!-- <h2>Moneyko te permite calcular tu <br>presupuesto y tus metas a largo <br> y corto plazo.</h2> -->
          <h2>Calcula tu presupuesto y controla <br> tus finanzas con nuestras <br> recomendaciones.</h2>
          <a href="/ingresos" class="primary"></a>
          <q-btn @click="$router.replace('/ingresos')"> Empieza ahora </q-btn>
          <div class="row">
            <a href="#" class="center-align">Ya estoy registrado</a>
          </div>
        </div>
      </div>

      <footer>
        <p>Todos los derechos reservados, Moneyko 2018.</p>
      </footer>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
  $dark-purple: #3f224c;
  $link: #361a44;
  $light-blue: #64c9db;
  $white: #ffffff;

  @font-face {
    font-family: NunitoBold;
    src: url(~assets/fonts/Nunito/Nunito-Bold.ttf);
  }

  @font-face {
    font-family: OpenSansSemibold;
    src: url(~assets/fonts/OpenSans/OpenSans-SemiBold.ttf);
  }

  $nunitobold: NunitoBold;
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

  .layout-padding {
    position: relative;
    padding: 0;
    .welcome {
      display: flex;
      align-items: center;
      min-height: 100vh;
      height: auto;
      padding: 75px 5% 0 5%;
      .content {
        text-align: center;
        margin: 0px;
        padding: 0px;
        width: 100%;

        h1 {
          font-family: $nunitobold;
          font-size: 50px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 29px;
          color: $dark-purple;
        }

        h2 {
          font-family: $os-semibold;
          font-size: 30px;
          font-weight: bold;
          line-height: 1.27;
          margin-bottom: 29px;
          color: $dark-purple;
        }

        button {
          font-family: $nunitobold;
          text-transform: initial;
          font-size: 20px;
          width: 300px;
          height: 50px;
          border-radius: 15px;
          background-color: $light-blue;
          color: white;
          border: 0px;
          outliner: 0;
          cursor: pointer;
          margin-bottom: 85px;
        }

        a {
          font-family: $nunitobold;
          width: 100%;
          font-size: 18px;
          font-weight: bold;
          line-height: 1.39;
          text-align: center;
          color: $link;
          text-decoration: underline;
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

      p {
        font-family: $nunitobold;
        font-size: 14px;
        font-weight: bold;
        margin: 0px;
        line-height: 50px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .layout-padding {
      .welcome {
        .content {
          h1 {
            font-size: 25px;
            margin-bottom: 13px;
          }

          h2 {
            font-size: 18px;
            margin-bottom: 60px;
          }

          button {
            width: 60%;
          }
        }
      }

      footer {
        display: none;
      }
    }
  }

  @media screen and (max-width: 400px) {
    .layout-padding {
      .welcome {
        .content {
          button {
            width: 80%;
          }
        }
      }
    }
  }
</style>
