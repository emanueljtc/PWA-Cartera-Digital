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
          <p>Precio <br> mas bajo <br> {{ PrintPrecioBajo }} <a href="http://landing.axtel.mx/nuevos/res/search/xtremo/?utm_source=google&utm_medium=cpc&utm_campaign=adqpros_xtremoresnonbrand&utm_content=paquetes&gclid=Cj0KCQjwl7nYBRCwARIsAL7O7dGDrOYuiq-wkfwNKLVE4LlIpDfy2QhxdHsPvtBi7ZwFifbxraRyAIkaAkPCEALw_wcB" target="_blank" v-show="mostrar_text_telefonia">MXN <br> (AXTEL Extremo)</a><a href="https://www.att.com.mx/att-con-todo-damos-mas.html" target="_blank" v-show="mostrar_text_smartphone">MXN <br> (AT&T)</a></p>
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
        <p v-show="mostrar_text_smartphone">Consulte en todas las empresas de telefonía móvil y decida por el plan que mejor se adapte a sus necesidades, muchas de las veces, una pequeña investigación de campo puede significar un gran ahorro de nuestros gastos</p>
        <p v-show="mostrar_text_agua">4 tips para el ahorro de agua:</p>
        <ol v-show="mostrar_text_agua">
            <li>Opta por tomar duchas en vez de baños. Una persona gasta en una ducha entre 40 a 50 litros por tres minutos, y cada minuto adicional son 15 litros más. El gasto del líquido sanitario es similar.</li>
            <li>Utilice la capacidad completa de los electrodomésticos como la lavadora.</li>
            <li>¡Ten cuidado con las fugas en el baño y la cocina!</li>
            <li>No dejes el grifo abierto al lavarte los dientes ni cuando friegues los platos.</li>
        </ol>
        <p v-show="mostrar_text_luz">4 tips para el ahorro de luz:</p>
        <ol v-show="mostrar_text_luz">
            <li>¡Aproveche al máximo la iluminación solar!</li>
            <li>Mantenga la parte trasera de su refrigerador limpios y ventilados, así consumirá 15% menos energía.</li>
            <li>Procure limpiar los filtros de los aires acondicionados y nunca ponga la temperatura más alta o más baja, unos 4 a 5 grados por encima o debajo de los límites es lo recomendable para ahorrar un porcentaje de energía.</li>
            <li>Use bombillas ahorrativas, ahorran hasta un 80% de energía.</li>
        </ol>
        <p v-show="mostrar_text_gas">4 tips para el ahorro de gas:</p>
        <ol v-show="mostrar_text_gas">
            <li>No dejar el agua caliente correr y cerrar los grifos cuando no se están utilizando.</li>
            <li>Protega con material aislante las tuberías de agua caliente.</li>
            <li>Utiliza cerrillos o encendedores para prender los equipos cuando se requieran.</li>
            <li>Cuando cocine en el horno, trata de abrirlo lo menos posible.</li>
        </ol>
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
      mostrar_text_smartphone: false,
      mostrar_text_agua: false,
      mostrar_text_luz: false,
      mostrar_text_gas: false
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
        this.mostrar_text_smartphone = !this.mostrar_text_smartphone
      }
      if (this.gastoMayor === 'Luz') {
        seleccionar = this.precio_mas_bajo.luz
        this.precioBajoSeleccionado = this.precio_mas_bajo.luz
        this.mostrar_text_luz = !this.mostrar_text_luz
      }
      if (this.gastoMayor === 'Agua') {
        seleccionar = this.precio_mas_bajo.agua
        this.precioBajoSeleccionado = this.precio_mas_bajo.agua
        this.mostrar_text_agua = !this.mostrar_text_agua
      }
      if (this.gastoMayor === 'Gas') {
        seleccionar = this.precio_mas_bajo.gas
        this.precioBajoSeleccionado = this.precio_mas_bajo.gas
        this.mostrar_text_gas = !this.mostrar_text_gas
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
