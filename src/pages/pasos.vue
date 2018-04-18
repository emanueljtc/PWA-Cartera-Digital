<template>
  <div>
    <!-- Back -->
    <button class="back back-header" v-bind:class="{ hide: DisabledBack }">
      <q-icon name="arrow_back" />
    </button>
    <button class="help" @click="openmodal = true" v-bind:class="{ hide: DisabledHelp }">
      <q-icon name="help" />
    </button>
    <q-slide-transition name="slide">
      <q-stepper @finish="finish()" ref="stepper" v-show="!finished">

        <!-- ===================================================== -->
        <!-- Ingresos -->
        <!-- ===================================================== -->
        <q-step title="ingresos">
          <div class="container valign-wrapper ingresos">
            <div class="content">
              <h2>Ingresos</h2>
              <p>Especifica tus ingresos mensuales</p>
              <q-field>
               <vue-autonumeric v-model="form.ingreso"
                  :options="{
                    currencySymbol: '$',
                    decimalPlaces: 2,
                    minimumValue: 0,
                  }" placeholder="$0.00"></vue-autonumeric>
              </q-field>
              <button class="next" @click="next(), help(), back()" v-bind:disabled="!isIngresoValid()">Siguiente <i class="material-icons">arrow_forward</i></button>
            </div>
          </div>
        </q-step>

        <!-- ===================================================== -->
        <!-- Egresos -->
        <!-- ===================================================== -->
        <q-step title="egresos" :ready="ready">
          <button class="back"
            @click="prev(), stophelp()"
          >
          </button>
          <div class="container egresos">
            <div class="content">
              <h2>Egresos</h2>
              <p>Especifica tus egresos</p>
              <q-field>
                <q-select
                  v-model="form_egreso.egreso"
                  :options="selectOptions"
                  float-label="Selecciona una opción"
                />
              </q-field>
              <div class="input-field center-align">
                <div class="row-m">
                  <p class="frecuencia_sub">Frecuencia</p>
                  <p class="cantidad_sub">Cantidad</p>
                </div>
              </div>
              <div class="input-field center-align">
                <div class="row-m">
                  <div class="period">
                    <input type="radio" v-model="form_egreso.frecuencia" id="radio_semanal" name="period" value="Semanal" />
                    <label for="radio_semanal">Semanal</label>
                    <input type="radio" v-model="form_egreso.frecuencia" id="radio_quincenal" name="period" value="Quincenal" />
                    <label for="radio_quincenal">Quincenal</label>
                    <input type="radio" v-model="form_egreso.frecuencia" id="radio_mensual" name="period" value="Mensual" />
                    <label for="radio_mensual">Mensual</label>
                  </div>
                  <div class="cantidad">
                    <p class="cantidad_sub_mob">Cantidad</p>
                    <q-field>
                       <vue-autonumeric v-model="form_egreso.cantidad"
                        :options="{
                          currencySymbol: '$',
                          decimalPlaces: 2,
                          minimumValue: 0,
                        }" placeholder="$0.00"></vue-autonumeric>
                    </q-field>
                  </div>
                </div>
              </div>
              <div class="collapsible-box">
                <q-list v-for="(egreso, key) in form.egresos" :key="key">
                    <q-collapsible group="somegroup" :label='egreso.egreso'>
                    <div>
                      <q-field>
                          <q-select
                            v-model="egreso.egreso"
                            :options="selectOptions"
                            float-label="Selecciona una opción"
                          />
                        </q-field>
                        <div class="input-field center-align">
                          <div class="row-m">
                            <p class="frecuencia_sub">Frecuencia</p>
                            <p class="cantidad_sub">Cantidad</p>
                          </div>
                        </div>
                        <div class="input-field center-align">
                          <div class="row-m">
                            <div class="period">
                              <input type="radio" v-model="egreso.frecuencia" :id="frecuenciaSemanalEgreso" :name="periodoagregadoEgreso" value="Semanal" />
                              <label :for="frecuenciaSemanalEgreso">Semanal</label>
                              <input type="radio" v-model="egreso.frecuencia" :id="frecuenciaQuincenalEgreso" :name="periodoagregadoEgreso" value="Quincenal" />
                              <label :for="frecuenciaQuincenalEgreso">Quincenal</label>
                              <input type="radio" v-model="egreso.frecuencia" :id="frecuenciaMensualEgreso" :name="periodoagregadoEgreso" value="Mensual" />
                              <label :for="frecuenciaMensualEgreso">Mensual</label>
                            </div>
                            <div class="cantidad">
                              <p class="cantidad_sub_mob">Cantidad</p>
                              <q-field>
                                 <vue-autonumeric v-model="egreso.cantidad"
                                  :options="{
                                    currencySymbol: '$',
                                    decimalPlaces: 2,
                                    minimumValue: 0,
                                  }" :placeholder="egreso.cantidad"></vue-autonumeric>
                              </q-field>
                            </div>
                          </div>
                        </div>
                        <q-btn flat label="Borrar" @click="deleteEgreso(egreso)" />
                    </div>
                  </q-collapsible>
                </q-list>
              </div>
              <div class="input-field center-align">
                <div class="row-m">
                  <q-btn :label="totalEgresos" @click="crearEgreso"  v-show="form.egresos.length < 4" icon="add"/>
                </div>
              </div>
              <button class="next" @click="NextEgreso()" v-bind:disabled="!isEgresoValid()" icon-right="fas fa-arrow-right">Siguiente <i class="material-icons">arrow_forward</i></button>
            </div>
          </div>
        </q-step>

        <!-- ===================================================== -->
        <!-- Gastos más fuertes -->
        <!-- ===================================================== -->
        <q-step title="gastos-mayor" :ready="ready">
          <button class="back"
            @click="$refs.stepper.previous()"
          >
          </button>
          <div class="container valign-wrapper gastos">
            <div class="content">
              <h2>Gastos más fuertes</h2>
              <p>¿Cuáles son tus gastos más fuertes?</p>
              <q-field>
                <q-select
                  v-model="form_gasto.gasto"
                  :options="selectOptions"
                  float-label="Selecciona una opción"
                />
              </q-field>
              <div class="input-field center-align">
                <div class="row-m">
                  <p class="frecuencia_sub">Frecuencia</p>
                  <p class="cantidad_sub">Cantidad</p>
                </div>
              </div>
              <div class="input-field center-align">
                <div class="row-m">
                  <div class="period">
                    <input type="radio" v-model="form_gasto.frecuencia" id="radio_semanal" name="period" value="Semanal" />
                    <label for="radio_semanal">Semanal</label>
                    <input type="radio" v-model="form_gasto.frecuencia" id="radio_quincenal" name="period" value="Quincenal" />
                    <label for="radio_quincenal">Quincenal</label>
                    <input type="radio" v-model="form_gasto.frecuencia" id="radio_mensual" name="period" value="Mensual" />
                    <label for="radio_mensual">Mensual</label>
                  </div>
                  <div class="cantidad">
                    <q-field>
                      <vue-autonumeric v-model="form_gasto.cantidad"
                        :options="{
                          currencySymbol: '$',
                          decimalPlaces: 2,
                          minimumValue: 0,
                        }" placeholder="$0.00"></vue-autonumeric>
                    </q-field>
                  </div>
                </div>
              </div>
              <div class="collapsible-box">
                <q-list v-for="(gasto, key) in form.gastos" :key="key">
                  <q-collapsible group="somegroup" :label='gasto.gasto'>
                    <div>
                      <q-field>
                        <q-select
                          v-model="gasto.gasto"
                          :options="selectOptions"
                          float-label="Selecciona una opción"
                        />
                      </q-field>
                      <div class="input-field center-align">
                        <div class="row-m">
                          <p class="frecuencia_sub">Frecuencia</p>
                          <p class="cantidad_sub">Cantidad</p>
                        </div>
                      </div>
                      <div class="input-field center-align">
                        <div class="row-m">
                          <div class="period">
                            <input type="radio" v-model="gasto.frecuencia" id="frecuenciaSemanalGasto" name="periodoagregadoGasto" value="Semanal" />
                            <label for="frecuenciaSemanalGasto">Semanal</label>
                            <input type="radio" v-model="gasto.frecuencia" id="frecuenciaQuincenalGasto" name="periodoagregadoGasto" value="Quincenal" />
                            <label for="frecuenciaQuincenalGasto">Quincenal</label>
                            <input type="radio" v-model="gasto.frecuencia" id="frecuenciaMensualGasto" name="periodoagregadoGasto" value="Mensual" />
                            <label for="frecuenciaMensualGasto">Mensual</label>
                          </div>
                          <div class="cantidad">
                            <q-field>
                              <vue-autonumeric v-model="gasto.cantidad"
                                :options="{
                                  currencySymbol: '$',
                                  decimalPlaces: 2,
                                  minimumValue: 0,
                                }" :placeholder="gasto.cantidad"></vue-autonumeric>
                            </q-field>
                          </div>
                        </div>
                      </div>
                      <q-btn flat label="Borrar" @click="deleteGasto(gasto)" />
                    </div>
                  </q-collapsible>
                </q-list>
              </div>
              <div class="input-field center-align">
                <div class="row-m">
                  <q-btn :label="totalGastos" @click="crearGasto"  v-show="form.gastos.length < 4" icon="add"/>
                </div>
              </div>
              <button class="next" @click="NextGasto(), stophelp()" v-bind:disabled="!isGastosValid()" icon-right="fas fa-arrow-right">Siguiente <i class="material-icons">arrow_forward</i></button>
            </div>
          </div>
        </q-step>

        <!-- ===================================================== -->
        <!-- Deuda -->
        <!-- ===================================================== -->
        <q-step title="deuda" :ready="ready">
          <button class="back"
            @click="$refs.stepper.previous(), help()"
          >
          </button>
          <div class="container valign-wrapper deuda">
            <div class="content">
              <h2>¿Tienes una deuda?</h2>
              <p>Especifica tu deuda</p>
              <div class="input-field center-align">
                <q-btn
                  @click="deudaExist = true, clickedDeuda = true"
                  label="Si"
                />
                <q-btn
                  @click="deudaExist = false, clickedDeuda = true"
                  label="No"
                />
              </div>
              <div class="deuda_desglose" v-if="deudaExist">
                <h2>¿De cuánto?</h2>
                <q-field>
                  <vue-autonumeric v-model="form.deuda"
                    :options="{
                      currencySymbol: '$',
                      decimalPlaces: 2,
                      minimumValue: 0,
                    }" placeholder="$0.00"></vue-autonumeric>
                </q-field>
                <div class="input-field center-align">
                  <div class="row-m">
                    <div class="period">
                      <p>Frecuencia de pagos</p>
                      <div class="frecuencias">
                        <input type="radio" v-model="form.frecuenciaDeuda" id="radio_semanal" name="period" value="semanal" />
                        <label for="radio_semanal">Pago único</label>
                        <input type="radio" v-model="form.frecuenciaDeuda" id="radio_quincenal" name="period" value="quincenal" />
                        <label for="radio_quincenal">Quincenal</label>
                        <input type="radio" v-model="form.frecuenciaDeuda" id="radio_mensual" name="period" value="mensual" />
                        <label for="radio_mensual">Mensual</label>
                        </div>
                    </div>
                    <div class="cantidad">
                      <p>Cantidad</p>
                      <vue-autonumeric v-model="form.cantidadDeuda"
                        :options="{
                          currencySymbol: '$',
                          decimalPlaces: 2,
                          minimumValue: 0,
                        }" placeholder="$0.00"></vue-autonumeric>
                    </div>
                  </div>
                </div>
              </div>
              <button class="next" @click="next()" v-bind:disabled="!isDeudaValid()">Siguiente <i class="material-icons">arrow_forward</i></button>
            </div>
          </div>
        </q-step>

        <!-- ===================================================== -->
        <!-- Metas -->
        <!-- ===================================================== -->
        <q-step title="metas" :ready="ready">
          <button class="back"
            @click="$refs.stepper.previous()"
          >
          </button>
          <div class="container metas center-align">
            <div class="content">
              <h2>Metas</h2>
              <p>¿Tienes una meta financiera?</p>
              <div class="input-field center-align">
                <q-btn @click="metaExist = true, clickedMeta = true" label="Si"/>
                <q-btn @click="metaExist = false, clickedMeta = true" label="No"/>
              </div>
              <div class="metas_desglose" v-if="metaExist">
                <div class="cuanto-meta">
                  <h2>¿De cuánto?</h2>
                  <q-field>
                    <vue-autonumeric v-model="form.cantidadMeta"
                        :options="{
                          currencySymbol: '$',
                          decimalPlaces: 2,
                          minimumValue: 0,
                        }" placeholder="$0.00"></vue-autonumeric>
                  </q-field>
                </div>
                <div class="para-meta">
                  <h2>¿Para qué?</h2>
                  <q-field>
                    <q-input v-model="form.meta" type="text" placeholder="Ejemplo. Viaje a méxico"/>
                  </q-field>
                </div>
              </div>
              <button class="next" @click="$router.replace('/correo')" v-bind:disabled="!isMetaValid()">Ver resultados</button>
            </div>
          </div>
        </q-step>
      </q-stepper>
    </q-slide-transition>
    <div v-show="finished" class="items-center column justify-center full-width full-height">
      <p class="caption">
        <i class="text-primary" style="font-size: 2rem; margin-right: 1rem;">check</i>
        <span>Finished. Well done!</span>
      </p>
      <button class="primary" @click="reset()">Reset</button>
    </div>
    <footer>
      <p>Todos los derechos reservados, Moneyko 2018.</p>
    </footer>

    <q-modal v-model="openmodal">
      <button class="close-modal" @click="openmodal = false">
        <q-icon name="close" />
      </button>
      <h4>Tus egresos corresponden a:</h4>
      <h3>Vivienda</h3>
      <p>Alquiler, Mantenimientos</p>
      <hr>
      <h3>Despensa</h3>
      <p>Comidas, Bebidas, <br> Artículos de aseo personal, <br> Limpieza del hogar</p>
      <hr>
      <h3>Transporte</h3>
      <p>Combustible, Otros</p>
      <hr>
      <h3>Gustos</h3>
      <p>Salidas, Diversión</p>
      <hr>
      <h3>Servicios básicos</h3>
      <p>Smartphone, Gas, Luz, Agua, <br> Telefonía/Internet</p>
    </q-modal>
  </div>
</template>

<script>
import { QStepper, QStep, QStepperNavigation, QSlideTransition, QField, QInput, QSelect, QRadio, QModal, QBtn, QCollapsible, Notify } from 'quasar'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'
export default {
  name: 'Pasos',
  data () {
    return {
      openmodal: false,
      //
      form: {
        ingreso: null,
        egresos: [],
        gastos: [],
        deuda: null,
        frecuenciaDeuda: null,
        cantidadDeuda: null,
        cantidadMeta: null,
        meta: null
      },
      //
      form_egreso: {
        egreso: null,
        frecuencia: null,
        cantidad: 0
      },
      //
      form_gasto: {
        gasto: null,
        frecuencia: null,
        cantidad: 0
      },
      //
      deudaExist: false,
      clickedDeuda: false,
      //
      metaExist: false,
      clickedMeta: false,
      //
      selectOptions: [
        {
          label: 'Vivienda',
          value: 'Vivienda'
        },
        {
          label: 'Despensa',
          value: 'Despensa'
        },
        {
          label: 'Transporte',
          value: 'Transporte'
        },
        {
          label: 'Gustos',
          value: 'Gustos'
        },
        {
          label: 'Servicios básicos',
          value: 'Servicios básicos'
        }
      ],
      //
      ready: false,
      finished: false,
      opened: false,
      DisabledBack: true,
      DisabledHelp: true
    }
  },
  methods: {
    // Stepper
    finish () {
      this.finished = true
    },
    reset () {
      this.$refs.stepper.reset()
      this.finished = false
    },
    prev () {
      this.$refs.stepper.previous()
      this.DisabledBack = true
    },
    next () {
      this.$refs.stepper.next()
    },
    back () {
      this.DisabledBack = false
    },
    help () {
      this.DisabledHelp = false
    },
    stophelp () {
      this.DisabledHelp = true
    },

    // Egreso
    NextEgreso () {
      const form_egreso = this.form_egreso
      const results = this.form.egresos.filter(function (element, index) {
        return element.egreso === form_egreso.egreso
      })
      if (results.length > 0) {
        this.$q.notify({
          message: `Ya existe este tipo de egreso`,
          timeout: 5000,
          position: 'top-right'
        })
      } else {
        this.form.egresos.push(form_egreso)
        this.$refs.stepper.next()
      }
    },
    crearEgreso () {
      const form_egreso = this.form_egreso
      const results = this.form.egresos.filter(function (element, index) {
        return element.egreso === form_egreso.egreso
      })
      if (results.length > 0) {
        this.$q.notify({
          message: `Ya existe este tipo de egreso`,
          timeout: 5000,
          position: 'top-right'
        })
      } else {
        this.form.egresos.push(form_egreso)
        this.resetFormEgreso()
      }
    },
    resetFormEgreso () {
      this.form_egreso = {
        egreso: null,
        frecuencia: null,
        cantidad: 0
      }
    },
    deleteEgreso (egreso) {
      this.form.egresos = this.form.egresos.filter((element, index) => element.egreso !== egreso.egreso)
    },
    // Gasto
    NextGasto () {
      const form_gasto = this.form_gasto
      const results = this.form.gastos.filter(function (element, index) {
        return element.gasto === form_gasto.gasto
      })
      if (results.length > 0) {
        this.$q.notify({
          message: `Ya existe este tipo de gasto`,
          timeout: 5000,
          position: 'top-right'
        })
      } else {
        this.form.gastos.push(form_gasto)
        this.$refs.stepper.next()
      }
    },
    crearGasto () {
      const form_gasto = this.form_gasto
      const results = this.form.gastos.filter(function (element, index) {
        return element.gasto === form_gasto.gasto
      })
      if (results.length > 0) {
        this.$q.notify({
          message: `Ya existe este tipo de gasto`,
          timeout: 5000,
          position: 'top-right'
        })
      } else {
        this.form.gastos.push(form_gasto)
        this.resetFormGasto()
      }
    },
    resetFormGasto () {
      this.form_gasto = {
        gasto: null,
        frecuencia: null,
        cantidad: 0
      }
    },
    deleteGasto (gasto) {
      this.form.gastos = this.form.gastos.filter((element, index) => element.gasto !== gasto.gasto)
    },

    // Mandar información a otro archivo
    sendData () {
      this.$store.dispatch('valuador/finish', this.form, {
        root: true
      })
    },

    // Validaciones
    isIngresoValid: function () {
      return this.form.ingreso !== null
    },
    isEgresoValid: function () {
      return this.form_egreso.egreso !== null && this.form_egreso.cantidad !== 0 && this.form_egreso.frecuencia !== null
    },
    isGastosValid: function () {
      return this.form_gasto.gasto !== null && this.form_gasto.cantidad !== 0 && this.form_gasto.frecuencia !== null
    },
    isDeudaValid: function () {
      if (this.clickedDeuda !== false) {
        if (this.deudaExist !== true) {
          return this.clickedDeuda !== false
        } else {
          return this.form.deuda !== null && this.form.cantidadDeuda !== null && this.form.frecuenciaDeuda !== null
        }
      }
    },
    isMetaValid: function () {
      if (this.clickedMeta !== false) {
        if (this.metaExist !== true) {
          return this.clickedmeta !== false
        } else {
          return this.form.meta !== null && this.form.cantidadMeta !== null
        }
      }
    }
  },
  computed: {
    totalEgresos () {
      const length = this.form.egresos.length + 1
      return `Agregar otra opción (${length}/5)`
    },
    totalGastos () {
      const length = this.form.gastos.length + 1
      return `Agregar otra opción (${length}/5)`
    },
    //
    frecuenciaSemanalEgreso () {
      const length = this.form.egresos.length
      return `semanal_${length}`
    },
    frecuenciaQuincenalEgreso () {
      const length = this.form.egresos.length
      return `quincenal_${length}`
    },
    frecuenciaMensualEgreso () {
      const length = this.form.egresos.length
      return `mensual_${length}`
    },
    periodoagregadoEgreso () {
      const length = this.form.egresos.length
      return `periodo_${length}`
    },
    //
    frecuenciaSemanalGasto () {
      const length = this.form.gastos.length
      return `semanal_gastos_${length}`
    },
    frecuenciaQuincenalGasto () {
      const length = this.form.gastos.length
      return `quincenal_gastos_${length}`
    },
    frecuenciaMensualGasto () {
      const length = this.form.gastos.length
      return `mensual_gastos_${length}`
    },
    periodoagregadoGasto () {
      const length = this.form.gastos.length
      return `periodo_gastos_${length}`
    }
  },
  components: {
    QStepper, QStep, QStepperNavigation, QSlideTransition, QField, QInput, QSelect, QRadio, QModal, QBtn, QCollapsible, VueAutonumeric, Notify
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
    font-family: Nunito;
    src: url(~assets/fonts/Nunito/Nunito-Regular.ttf);
  }
  @font-face {
    font-family: NunitoSemibold;
    src: url(~assets/fonts/Nunito/Nunito-SemiBold.ttf);
  }
  @font-face {
    font-family: NunitoBold;
    src: url(~assets/fonts/Nunito/Nunito-Bold.ttf);
  }
  @font-face {
    font-family: OpenSans;
    src: url(~assets/fonts/OpenSans/OpenSans-Regular.ttf);
  }
  @font-face {
    font-family: OpenSansSemi;
    src: url(~assets/fonts/OpenSans/OpenSans-SemiBold.ttf);
  }
  $nunito: Nunito;
  $nunitosemibold: NunitoSemibold;
  $nunitobold: NunitoBold;
  $opensans: OpenSans;
  $os-semibold: OpenSansSemi;

  header {
    display: initial !important;
  }

  h2 {
    font-family: $nunitobold;
    font-size: 35px;
    font-weight: bold;
    line-height: 1.27;
    text-align: center;
    color: $dark-purple;
    margin: 0;
  }

  p {
    font-family: $opensans;
    font-size: 20px;
    line-height: 1.25;
    text-align: center;
    color: $dark-purple;
    margin-bottom: 0px;
    margin-top: 10px;
  }

  button {
    position: relative;
    font-family: $nunito;
    font-size: 20px;
    font-weight: 500;
    width: 300px;
    height: 50px;
    border-radius: 15px;
    background-color: $light-blue;
    color: white;
    border: 0px;
    outliner: 0;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 100px;

    i {
      position: relative;
      top: 5px;
    }
  }

  .close-modal {
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 22px;
    padding: 0px;
    border: 0px;
    box-shadow: none;
    color: $dark-purple;
    cursor: pointer !important;
    margin: 0px;
    background-color: $white;
    width: auto;
    height: auto;
  }

  .close-modal:hover {
    .q-focus-helper {
      background-color: transparent !important;
    }
  }

  .back, .help {
    position: fixed;
    left: calc(5% + 12px);
    background-color: transparent;
    z-index: 5000;
    margin: 0px;
    padding: 0px;
    width: auto;
    height: 70px;
    line-height: 70px;
    color: $dark-purple;
    box-shadow: none;
    font-size: 30px;
    width: 30px;

    i {
      margin-bottom: 15px;
    }
  }

  .help {
    right: calc(5% + 12px);
    left: initial;
    font-size: 25px;
  }

  .back:hover,
  .back:focus,
  .help:hover,
  .help:focus {
    outline: none;
  }

  .q-layout-page-container {
    padding: 0px !important;
  }

  .q-list {
    padding: 0px;
    .q-item {
      color: $dark-purple;
      font-family: $os-semibold;
      font-size: 16px;
      border-bottom: 1px solid $gray;
    }

    .q-item:hover {
      background-color: $gray !important;
    }
  }

  .row-m {
    max-width: 45%;
    width: 100%;
    display: inline-block;
    text-align: left;
  }

  .q-stepper-header {
    display: none;
  }

  .q-stepper {
    font-family: $nunito;
    box-shadow: 0px 0 0 0;
    .q-stepper-header {
      box-shadow: 0px 0 0 0;
    }
    .q-stepper-step {
      text-align: center;
      .q-stepper-step-inner {
        padding: 0px;
      }
      .q-stepper-step-content {
        position: relative;

        .ingresos {
          font-family: $nunito;
          min-height: 100vh;
          height: auto;
          padding: 120px 5% 90px 5%;
          display: flex;
          align-items: center;

          .content {
            margin: 0px;
            padding: 0px;
            width: 100%;

            .q-field {
              text-align: center;
            }

            input {
              font-family: $nunitobold;
              color: $green;
              font-size: 60px;
              font-weight: bold;
              text-align: center;
              line-height: initial;
              height: auto;
              border: none;
              border-bottom: 1px solid $gray;
              max-width: 350px;
              width: 100%;
              margin-top: 100px;
            }

            input:focus {
              outline: none;
            }

            input::-webkit-input-placeholder {
              color: $green !important;
            }
            input::-moz-placeholder {
              color: $green;
            }
            input:-ms-input-placeholder {
              color: $green;
            }
            input:-moz-placeholder {
              color: $green;
            }
          }
        }

        .egresos,
        .gastos {
          font-family: $nunito;
          min-height: 100vh;
          height: auto;
          padding: 120px 5% 90px 5%;
          display: flex;
          align-items: center;

          .content {
            margin: 0px;
            padding: 0px;
            width: 100%;

            p {
              margin-bottom: 40px;
            }

            button {
              margin-top: 0px;
            }

            .q-field {
              text-align: center;
            }

            .collapsible-box {
              margin-bottom: 30px;
              .q-list {
                position: relative;
                left: 27.5%;
                width: 45%;

                .q-collapsible {
                  .q-collapsible-sub-item {
                    padding-bottom: 50px;
                  }
                  .q-select {
                    min-width: 95%;
                  }

                  .row-m {
                    max-width: 95%;

                    .period {
                      margin-bottom: 0px;
                    }
                  }

                  .q-item-label {
                    text-transform: uppercase;
                    font-weight: bold;
                    letter-spacing: 1px;
                    font-size: 14px;
                  }

                  button {
                    width: auto;
                    height: auto;
                    padding: 5px 10px;
                    border-radius: 0px;
                    margin: 0;
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    background: transparent;
                    color: $dark-purple;
                    font-weight: bold;
                    font-size: 13px;
                  }
                }
              }
            }

            .q-select {
              min-width: 45%;
              display: inline-block !important;
              float: none !important;
              margin-bottom: 38px;

              .q-if-control.q-icon {
                padding-top: 12px;
                color: $dark-purple;
              }
              .q-if-inner {
                width: calc(100% - 24px);
                float: left;

                .q-if-label,
                .q-if-label-above {
                  font-family: $os-semibold;
                  font-size: 16px !important;
                  font-weight: 600;
                  text-align: left;
                  color: $dark-purple !important;
                }

                .q-input-target {
                  color: $dark-purple;
                  font-family: $os-semibold;
                  font-size: 16px;
                }
              }

              input.q-input-target {
                font-weight: bold;
                text-align: left;
                color: $green;
                line-height: initial;
                height: auto;
              }
            }

            .frecuencia_sub,
            .cantidad_sub,
            .cantidad_sub_mob {
              font-family: $os-semibold;
              font-size: 16px;
              font-weight: 600;
              text-align: left;
              color: $dark-purple;
              float: left;
              margin-bottom: 11px;
              margin-top: 0px;
            }

            .cantidad_sub_mob {
              display: none;
            }

            .frecuencia_sub {
              width: 70%;
            }
            .cantidad_sub {
              width: 30%;
            }

            .period {
              margin-bottom: 30px;
              float: left;
              width: 70%;
              input[type=radio], input[type=checkbox] {
                display: none;
              }
              input[type=radio] + label, input[type=checkbox] + label {
                font-family: $os-semibold;
                display: inline-block;
                background-color: $gray-button;
                color: $dark-purple;
                border-radius: 5px;
                padding: 8px 15px;
                cursor: pointer;
              }
              input[type=radio]:checked + label, input[type=checkbox]:checked + label {
                background-color: $purple;
                color: $white;
              }
            }

            .cantidad {
              float: left;
              width: 30%;

              input {
                font-family: $nunitobold;
                color: $pink;
                font-size: 25px;
                font-weight: bold;
                text-align: left;
                line-height: initial;
                height: auto;
                border: none;
                border-bottom: 1px solid $gray;
                width: inherit;
              }

              input:focus {
                outline: none;
              }

              input::-webkit-input-placeholder {
                color: $pink !important;
              }
              input::-moz-placeholder {
                color: $pink;
              }
              input:-ms-input-placeholder {
                color: $pink;
              }
              input:-moz-placeholder {
                color: $pink;
              }
            }

            .row-m {
              button {
                position: relative;
                font-family: $os-semibold;
                text-transform: initial;
                width: auto;
                height: 50px;
                box-shadow: 0 0 0 0;
                border-radius: 15px;
                background-color: transparent;
                color: $purple;
                border: 0px;
                outline: 0;
                cursor: pointer;
                font-size: 16px;
                margin-bottom: 50px;
                padding: 0px;
              }

              .q-focus-helper {
                background-color: transparent;
              }

              i {
                position: relative;
                font-size: 30px;
                top: 0;
              }
            }
          }
        }

        .deuda, .metas {
          font-family: $nunito;
          min-height: 100vh;
          height: auto;
          padding: 120px 5% 90px 5%;
          display: flex;
          align-items: center;

          .content {
            margin: 0px;
            padding: 0px;
            width: 100%;

            p {
              margin: 0px 0px 10px 0px;
            }

            button {
              margin-bottom: 15px;
              margin-top: 25px;
            }

            input[type=radio], input[type=checkbox] {
              display: none;
            }

            .q-btn {
              display: inline-block;
              background-color: $gray-button;
              color: $dark-purple;
              border-radius: 5px;
              padding: 0px 15px;
              cursor: pointer;
              width: 120px;
              height: 40px;
              text-align: center;
              margin: 15px 7.5px;
              font-size: 16px;
              font-family: $os-semibold;
            }

            .q-btn:hover,
            .q-btn:focus {
              background-color: $purple;
              color: $white;
            }

            input[type=radio]:checked + label, input[type=checkbox]:checked + label {
              background-color: $purple;
              color: $white;
            }

            .deuda_desglose {
              margin-top: 40px;

              h2 {
                margin-bottom: 15px;
              }

              .q-field {
                text-align: center;
              }

              input {
                font-family: $nunitobold;
                color: $yellow;
                font-size: 50px;
                font-weight: bold;
                text-align: center;
                line-height: initial;
                height: auto;
                border: none;
                border-bottom: 1px solid $gray;
                max-width: 350px;
                width: 100%;
              }

              input:focus {
                outline: none;
              }

              input::-webkit-input-placeholder {
                color: $yellow !important;
              }
              input::-moz-placeholder {
                color: $yellow;
              }
              input:-ms-input-placeholder {
                color: $yellow;
              }
              input:-moz-placeholder {
                color: $yellow;
              }

              .row-m {
                max-width: 350px;
              }

              .period {
                margin: 40px 0 25px 0;
                p {
                  font-family: $os-semibold;
                  font-size: 16px;
                  font-weight: 600;
                  text-align: left;
                  margin-bottom: 13px;
                  color: $dark-purple;
                }

                .frecuencias {
                  display: flex;
                  justify-content: space-between;
                }

                input[type=radio], input[type=checkbox] {
                  display: none;
                }
                input[type=radio] + label, input[type=checkbox] + label {
                  font-family: $os-semibold;
                  font-size: 14px;
                  display: inline-block;
                  background-color: $gray-button;
                  color: $dark-purple;
                  border-radius: 5px;
                  padding: 8px 15px;
                  cursor: pointer;
                }
                input[type=radio]:checked + label, input[type=checkbox]:checked + label {
                  background-color: $purple;
                  color: $white;
                }
              }

              .cantidad {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 25px 0;
                p {
                  width: auto;
                  font-family: $os-semibold;
                  font-size: 16px;
                  font-weight: 600;
                  text-align: left;
                  color: $dark-purple;
                  float: left;
                  margin: 0px;
                }

                input {
                  font-family: $nunitobold;
                  color: $pink;
                  font-size: 25px;
                  font-weight: bold;
                  text-align: left;
                  line-height: initial;
                  height: auto;
                  border: none;
                  border-bottom: 1px solid $gray;
                  width: 50%;
                }

                input:focus {
                  outline: none;
                }

                input::-webkit-input-placeholder {
                  color: $pink !important;
                }
                input::-moz-placeholder {
                  color: $pink;
                }
                input:-ms-input-placeholder {
                  color: $pink;
                }
                input:-moz-placeholder {
                  color: $pink;
                }

                .q-input {
                  max-width: 130px;
                  float: right;
                  display: inline-block !important;
                  float: none !important;
                  input.q-input-target {
                    font-size: 25px;
                    font-weight: bold;
                    text-align: right;
                    color: $pink;
                    line-height: initial;
                    height: auto;
                  }

                  input::-webkit-input-placeholder {
                    color: $pink !important;
                  }
                  input::-moz-placeholder {
                    color: $pink;
                  }
                  input:-ms-input-placeholder {
                    color: $pink;
                  }
                  input:-moz-placeholder {
                    color: $pink;
                  }
                }
              }
            }
          }
        }

        .metas {
          .content {
            .metas_desglose {
              margin-top: 40px;
              margin-bottom: 25px;

              h2 {
                margin-bottom: 10px;
              }

              .cuanto-meta {
                input {
                  font-family: $nunitobold;
                  color: $green;
                  font-size: 60px;
                  font-weight: bold;
                  text-align: center;
                  line-height: initial;
                  height: auto;
                  border: none;
                  border-bottom: 1px solid $gray;
                  max-width: 350px;
                  width: 100%;
                }

                input:focus {
                  outline: none;
                }

                input::-webkit-input-placeholder {
                  color: $green !important;
                }
                input::-moz-placeholder {
                  color: $green;
                }
                input:-ms-input-placeholder {
                  color: $green;
                }
                input:-moz-placeholder {
                  color: $green;
                }
              }

              .para-meta {
                h2 {
                  margin-top: 40px;
                }

                .q-if:before,
                .q-if:after {
                  color: $dark-purple;
                }

                .q-input {
                  max-width: 350px;
                  width: 350px;
                  display: inline-block !important;
                  float: none !important;

                  input {
                    font-size: 16px;
                    color: $dark-purple;
                    line-height: 1.56px;
                    text-align: center;
                  }

                  input::-webkit-input-placeholder {
                    color: $gray !important;
                  }

                  input::-moz-placeholder {
                    color: $gray;
                  }

                  input::-ms-input-placeholder {
                    color: $gray;
                  }

                  input:-moz-placeholder {
                    color: $gray;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: $dark-purple;
    text-align: center;

    p {
      font-family: $nunitobold;
      font-size: 14px;
      font-weight: bold;
      margin: 0px;
      line-height: 50px;
      color: $white !important;
    }
  }

  @media screen and (max-width: 1100px) {
    .row-m {
      max-width: 65%;
    }
    .egresos, .gastos {
      .content {
        .q-list {
          width: 65% !important;
          left: 17.5% !important;
        }

        .q-select {
          width: 65%;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .row-m {
      max-width: 45%;
    }

    .back,
    .help {
      height: 55px;
      line-height: 55px;
      left: 5%;
    }

    .help {
      right: calc(50% - 12px);
      left: initial;
    }

    h2 {
      font-size: 25px;
    }

    p {
      font-size: 18px;
      margin-top: 5px;
    }

    .next {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      margin: 0px !important;
      border-radius: 0px;
    }

    .ingresos {
      padding: 50px 10% 100px 10% !important;

      input {
        margin-top: 60px !important;
        font-size: 40px !important;
      }
    }

    .egresos,
    .gastos,
    .deuda,
    .metas {
      padding: 50px 5% 100px 5% !important;
    }

    .egresos, .gastos {
       padding-bottom: 130px !important;
       .content {
        .collapsible-box {
          margin-top: 40px;
        }

        .q-select, .q-list {
          margin-bottom: 30px !important;
          min-width: 100% !important;
          left: 0% !important;
        }
        .q-list {
          margin-bottom: 0px !important;
        }
      }

      .row-m {
        display: initial;
        width: 100% !important;

        .cantidad_sub {
          display: none;
        }

        .period, .cantidad {
          float: none !important;
          width: 100% !important;
        }

        .period {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px !important;
        }

        .cantidad {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .cantidad_sub_mob {
            margin-bottom: 0 !important;
            display: block !important;
          }
        }

        .q-btn {
          position: absolute !important;
          left: 5% !important;
          bottom: 60px !important;
          margin: 0px !important;
        }
      }
    }

    .metas {
      .q-input {
        width: 100% !important;
      }
    }

    footer {
      display: none;
    }
  }
</style>
