<template>
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
</template>

<script>
export default {
  name: 'Gastos',
  data () {
    return {
      tuGasto: '700.00',
      precioBajo: '500.00'
    }
  }
}
</script>

<style>
</style>
