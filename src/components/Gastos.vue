<template>
  <div class="container gastos-mayor center-align">
    <div class="content">
      <h2>Con base en los costos <br> mas bajos del mercado</h2>
      {{ OrdenarGastos() }}
      <div class="circulos">
        <div class="tu-precio items-center">
          <p>Tú <br> {{ PrintTuGasto }}</p>
        </div>
        <div class="precio-bajo items-center">
          <p>Precio <br> mas bajo <br> {{ PrintPrecioBajo }} <a href="http://landing.axtel.mx/nuevos/res/search/xtremo/?utm_source=google&utm_medium=cpc&utm_campaign=adqpros_xtremoresnonbrand&utm_content=paquetes&gclid=Cj0KCQjwl7nYBRCwARIsAL7O7dGDrOYuiq-wkfwNKLVE4LlIpDfy2QhxdHsPvtBi7ZwFifbxraRyAIkaAkPCEALw_wcB" target="_blank" v-show="mostrar_text_telefonia">MXN <br> (AXTEL Extremo)</a><a v-show="mostrar_text_smartphone">MXN <br> (AT&T)</a></p>
        </div>
      </div>
      <i class="material-icons arrow">arrow_downward</i>
      <div class="ahorro">
        <p>{{ AhorroText() }}</p>
        <p><span> {{ PrintAhorro }} </span></p>
        <p>en {{ gastoMayor }}</p>
      </div>
      <div class = "text_informativo">
        <p v-show="mostrar_text_telefonia">Haga un comparativo entre las tarifas y opte por la oferta que abarque las necesidades reales de su hogar. Analice lo que contrate, y si alguno de los servicios lo considera indispensable, elimínelo. </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gastos',
  data () {
    return {
      form: {
        gastos: []
      },
      precio_mas_bajo: {
        smartphone: 349,
        telefonia: 418,
        luz: 400,
        gas: 350,
        agua: 200
      },
      gastoMayorCantidad: 0,
      gastoMayor: null,
      precioBajoSeleccionado: 0,
      mostrar_text_telefonia: false,
      mostrar_text_smartphone: false
    }
  },
  created () {
    this.$store.dispatch('gastos/all')
      .then(gastos => {
        gastos.forEach((gastos) => {
          this.form.gastos.push(gastos)
        })
      })
  },
  methods: {
    OrdenarGastos () {
      let mayorCantidad = 0
      let mayor = null
      this.form.gastos.forEach(function (gasto, index) {
        if (gasto.cantidadMensual > mayorCantidad) {
          mayorCantidad = gasto.cantidadMensual
          mayor = gasto.gasto
        }
      })
      this.gastoMayorCantidad = mayorCantidad
      this.gastoMayor = mayor
    },
    /* MostrarMsg () {
      let seleccionar = 0
      if (this.gastoMayor === 'Telefonía, Cable/Internet') {
        console.log('Prueba')
      }
    }, */
    SeleccionarPrecioBajo () {
      let seleccionar = 0
      if (this.gastoMayor === 'Smartphone') {
        seleccionar = this.precio_mas_bajo.smartphone
        this.precioBajoSeleccionado = this.precio_mas_bajo.smartphone
      }
      if (this.gastoMayor === 'Luz') {
        seleccionar = this.precio_mas_bajo.luz
        this.precioBajoSeleccionado = this.precio_mas_bajo.luz
      }
      if (this.gastoMayor === 'Agua') {
        seleccionar = this.precio_mas_bajo.agua
        this.precioBajoSeleccionado = this.precio_mas_bajo.agua
      }
      if (this.gastoMayor === 'Gas') {
        seleccionar = this.precio_mas_bajo.gas
        this.precioBajoSeleccionado = this.precio_mas_bajo.gas
      }
      if (this.gastoMayor === 'Telefonía, Cable/Internet') {
        seleccionar = this.precio_mas_bajo.telefonia
        this.precioBajoSeleccionado = this.precio_mas_bajo.telefonia
        this.mostrar_text_telefonia = !this.mostrar_text_telefonia
      }
      return seleccionar
    },
    AhorroText () {
      let text = ''
      if (this.gastoMayorCantidad > this.precioBajoSeleccionado) {
        text = 'Podrías estar ahorrando'
      } else {
        text = '¡Muy bien! Estas ahorrando'
      }
      return text
    },
    Ahorro () {
      let ahorro = 0
      if (this.gastoMayorCantidad > this.precioBajoSeleccionado) {
        ahorro = this.gastoMayorCantidad - this.precioBajoSeleccionado
      } else {
        ahorro = this.precioBajoSeleccionado - this.gastoMayorCantidad
      }
      return ahorro
    }
  },
  computed: {
    PrintTuGasto () {
      let value = this.gastoMayorCantidad
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintPrecioBajo () {
      let value = this.SeleccionarPrecioBajo()
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    },
    PrintAhorro () {
      let value = this.Ahorro()
      let currencyNum = '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      return currencyNum
    }
  }
}
</script>

<style>
</style>
