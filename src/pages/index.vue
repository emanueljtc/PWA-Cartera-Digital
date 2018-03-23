<template>
  <div>
    <div class="layout-padding center-align">
      <div class="container valign-wrapper ingresos">
        <div class="content">
          <img src="~assets/img/moneyko.svg" alt="MoneyKo">
          <h1>Calcula tu presupuesto y controla <br> tus finanzas con nuestras <br> recomendaciones.</h1>
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
  .layout-padding {
    position: relative;
    .ingresos {
      min-height: 80vh;
      height: auto;
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
          font-size: 30px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.27;
          letter-spacing: normal;
          text-align: center;
          color: #3f224c;
        }

        button {
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
          width: 100%;
          font-size: 18px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.39;
          letter-spacing: normal;
          text-align: center;
          color: #361a44;
          text-decoration: underline;
        }
      }
    }
  }
</style>
