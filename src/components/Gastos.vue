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
          <p>Precio <br> mas bajo <br> {{ PrintPrecioBajo }}</p>
        </div>
      </div>
      <i class="material-icons arrow">arrow_downward</i>
      <div class="ahorro">
        <p>Podrías estar ahorrando</p>
        <p><span> {{ PrintAhorro }} </span></p>
        <p>en Internet</p>
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
      precioBajoSeleccionado: '500.00'
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
      if (this.gastoMayor === 'Telefonía') {
        seleccionar = this.precio_mas_bajo.telefonia
        this.precioBajoSeleccionado = this.precio_mas_bajo.telefonia
      }
      return seleccionar
    },
    Ahorro () {
      let ahorro = this.gastoMayorCantidad - this.precioBajoSeleccionado
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
