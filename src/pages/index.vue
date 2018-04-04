<template>
  <div>
    <div class="layout-padding center-align">
      <div class="container valign-wrapper welcome">
        <div class="content">
          <img src="~assets/img/moneyko.svg" alt="MoneyKo">
          <!-- <img src="~assets/img/moneyko-logo.svg" alt="MoneyKo"> -->
          <!-- <h1>Bienvenido</h1> -->
          <h2>Moneyko te permite calcular tu <br>presupuesto y tus metas a largo <br> y corto plazo.</h2>
          <a href="/ingresos" class="primary"></a>
          <q-btn @click="$router.replace('/ingresos')"> Empieza ahora </q-btn>
          <div class="row">
            <a href="#" class="center-align">Ya estoy registrado</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
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

  .layout-padding {
    position: relative;
    padding: 0;
    .welcome {
      min-height: calc(100vh - 91px);
      height: auto;
      padding: 0 5%;
      .content {
        text-align: center;
        margin: 0px;
        padding: 0px;
        float: left;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        left: 50%;

        h1 {
          font-family: $nunitobold;
          font-size: 50px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 29px;
          color: #3f224c;
        }

        h2 {
          font-family: $os-semibold;
          font-size: 30px;
          font-weight: bold;
          line-height: 1.27;
          margin-bottom: 29px;
          color: #3f224c;
        }

        button {
          font-family: $nunitobold;
          text-transform: initial;
          font-size: 20px;
          width: 300px;
          height: 50px;
          border-radius: 15px;
          background-color: #64c9db;
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
          color: #361a44;
          text-decoration: underline;
        }
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
