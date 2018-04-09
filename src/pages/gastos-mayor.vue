<template>
  <div>
    <div class="container gastos-mayor center-align">
      <div class="content">
        <h2>Con base en los costos <br> mas bajos del mercado</h2>
        <div class="circulos">
          <div class="tu-precio items-center">
            <p>Tú <br> ${{ tuGasto }}</p>
          </div>
          <div class="precio-bajo items-center">
            <p>Precio <br> mas bajo <br> ${{ precioBajo }}</p>
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
export default {
  data () {
    return {
      tuGasto: '700.00',
      precioBajo: '500.00'
    }
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
    font-family: OpenSansSemibold;
    src: url(~assets/fonts/OpenSans/OpenSans-SemiBold.ttf);
  }

  @font-face {
    font-family: OpenSans;
    src: url(~assets/fonts/OpenSans/OpenSans-Regular.ttf);
  }

  $nunitobold: NunitoBold;
  $opensans: OpenSans;
  $os-semibold: OpenSansSemibold;

  .q-layout-page-container {
    padding: 0px !important;
  }

  .gastos-mayor {
    position: relative;
    min-height: 100vh;
    height: auto;
    margin: 0px;
    padding: 120px 5% 100px 5%;
    width: 100%;
    display: flex;
    align-items: center;

    .content {
      width: 100%;
      h2 {
        font-family: $nunitobold;
        font-size: 35px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.27;
        letter-spacing: normal;
        text-align: center;
        color: $dark-purple;
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
            font-family: $os-semibold;
            width: auto;
            margin: 0 15%;
            color: $white;
            font-size: 18px;
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
        color: $dark-purple;
        margin-bottom: 40px;
      }

      .ahorro {
        p {
          font-family: $opensans;
          color: $dark-purple;
          font-size: 18px;
          font-weight: normal;
          line-height: 1.39;
          margin: 0;

          span {
            font-family: $nunitobold;
            font-size: 60px;
            font-weight: bold;
            color: $green;
          }
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .gastos-mayor {
      padding: 0 5%;
      padding-bottom: 50px;
      .content {
        h2 {
          font-size: 25px !important;
        }

        .circulos {
          min-height: 150px;
          .tu-precio, .precio-bajo {
            p {
              font-size: 16px;
            }
          }

          .tu-precio {
            margin-right: -15px;
          }

          .precio-bajo {
            margin-left: -15px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 400px) {
    .gastos-mayor {
      .content {
        .circulos {
          .tu-precio,
          .precio-bajo {
            width: 150px;
            height: 150px;
          }
        }
      }
    }
  }
</style>
