<template>
  <div>
    <div class="container gastos-mayor center-align">
      <div class="content">
        <h2>Con base en los costos <br> mas bajos del mercado</h2>
        <div class="circulos">
          <div class="tu-precio items-center">
            <p>Tú <br> $700.00</p>
          </div>
          <div class="precio-bajo items-center">
            <p>Precio <br> mas bajo <br> $500.00</p>
          </div>
        </div>
        <i class="material-icons arrow">arrow_downward</i>
        <div class="ahorro">
          <p>Podrías estar ahorrando</p>
          <p><span>$200.00</span></p>
          <p>en Internet</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
  $green: #c0d84a;
  $dark-blue: #3f224c;
  $purple: #af85bc;
  $white: #ffffff;
  $blue-light: #64c9db;

  .gastos-mayor {
    position: relative;
    margin: 0px;
    padding: 0px;
    width: 100%;
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

      .circulos {
        position: relative;
        width: 100%;
        min-height: 200px;
        height: auto;
        display: flex;
        justify-content: center;

        .tu-precio, .precio-bajo {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 100px;
          background: green;
          display: flex;

          p {
            width: auto;
            margin: 0 15%;
            color: $white;
            font-size: 16px;
            font-weight: 600;
            font-style: normal;
            line-height: 1.56;
            letter-spacing: normal;
            text-align: center;
          }
        }

        .tu-precio {
          background-color: rgba(63, 34, 76, 0.7);
          margin-right: -35px;
        }

        .precio-bajo {
          background-color: rgba(224, 55, 87, 0.7);
          margin-left: -35px;
          justify-content: flex-end;
        }
      }

      .arrow {
        font-size: 35px;
        color: $dark-blue;
        margin-bottom: 40px;
      }

      .ahorro {
        p {
          color: $dark-blue;
          font-size: 18px;
          font-weight: normal;
          line-height: 1.39;
          margin: 0;

          span {
            font-size: 60px;
            font-weight: bold;
            color: $green;
          }
        }
      }
    }
  }
</style>
