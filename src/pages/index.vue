<template lang="pug">
  <div>
      <!-- <section id="d_start">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <img src="" alt="">
            </div>
            <div class="col-sm-12 col-md-6 offset-md-3">
              <p>Calcula tu presupuesto y controla tus finanzas con nuestras recomendaciones.</p>
            </div>
            <div class="col-sm-12 start-now">
              <a href="#" class="btn">Empieza ahora</a>
            </div>
            <div class="col-sm-12">
              <a href="#">Ya estoy registrado</a>
            </div>
          </div>
        </div>
      </section> -->

      <section id="d_ingresos">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <img src="" alt="">
            </div>
            <div class="col-sm-12">
              <h1>Ingresos</h1>
              <p>Especifica tus ingresos mensuales</p>
            </div>
            <div class="col-sm-12">
              <form action="">
                <div class="input-field add-ingresos">
                  <input type="text" name="ingresos" id="ingresos" placeholder="$10,000.00">
                </div>
                <div class="input-field">
                  <button type="submit" class="btn" id="siguiente">Siguiente</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div class="container">
          <div class="row">
            <p>Todos los derechos reservados, Moneyko 2018.</p>
          </div>
        </div>
      </footer>
  </div>
</template>

<script>

</script>

<style lang="scss">
  // Colors
  $purple:  #3f224c;
  $white:   #FFF;
  $blue:    #64c9db;
  $green:   #c0d84a;
  $gray:    #dedede;

  .btn {
    background-color: $blue;
    color: $white;
    font-size: 20px;
    font-weight: bold;
    padding: 14px 60px;
    text-decoration: none;
    border-radius: 15px;
    border: none;
    cursor: pointer;
  }

  #d_start {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    height: auto;
    width: 100%;
    text-align: center;

    .container {
      .row {
        p {
          color: $purple;
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 30px;
        }

        .start-now {
          margin-bottom: 106px;
        }

        a {
          color: $purple;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }

  #d_ingresos {
    position: relative;
    min-height: 100vh;
    height: auto;
    width: 100%;
    text-align: center;
    color: $purple;
    padding-bottom: 150px;

    .container {
      .row {
        h1 {
          font-size: 35px;
          font-weight: bold;
          margin-top: 57px;
          margin-bottom: 10px;
        }

        p {
          font-size: 20px;
          line-height: 25px;
          margin-bottom: 150px;
        }

        form {
          .input-field {
            position: relative;
            width: 30%;
            left: 35%;

            input {
              border: none;
              border-bottom: 1px solid $gray !important;
              font-size: 60px;
              color: $green;
              text-align: center;
              width: 100%;
            }

            input:focus {
              outline: none;
            }
          }

          .add-ingresos {
            margin-bottom: 150px;
          }
        }
      }
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: $purple;
    color: $white;
    height: 50px;

    p {
      line-height: 50px;
      font-size: 12px;
      text-align: center;
      width: 100%;
      margin: 0px;
    }
  }
</style>
