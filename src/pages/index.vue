<template lang="pug">
  <div>
      <section id="d_start">
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

           .btn {
            background-color: $blue;
            color: $white;
            font-size: 20px;
            font-weight: bold;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 15px;
          }
        }

        a {
          color: $purple;
          font-size: 18px;
          font-weight: bold;
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
