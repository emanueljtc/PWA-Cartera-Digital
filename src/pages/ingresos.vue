<template>
  <div>
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
                <q-input v-model="ingreso" type="number" prefix="$" placeholder="0.00"/>
              </q-field>
              <button class="primary" @click="next()" v-bind:disabled="!isIngresoValid()">Siguiente <i class="material-icons">arrow_forward</i></button>
            </div>
          </div>
        </q-step>
        <!-- ===================================================== -->
        <!-- Egresos -->
        <!-- ===================================================== -->
        <q-step title="egresos" :ready="ready">
          <div class="container valign-wrapper egresos">
            <div class="content">
              <h2>Egresos</h2>
              <p>Especifica tus egresos mensuales</p>
              <q-field>
                <q-select
                  v-model="egreso"
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
                    <input type="radio" id="radio_semanal" name="period" value="semanal" />
                    <label for="radio_semanal">Semanal</label>
                    <input type="radio" id="radio_quincenal" name="period" value="quincenal" />
                    <label for="radio_quincenal">Quincenal</label>
                    <input type="radio" id="radio_mensual" name="period" value="mensual" />
                    <label for="radio_mensual">Mensual</label>
                  </div>
                  <div class="cantidad">
                    <q-field>
                      <q-input v-model="egreso" type="number" prefix="$" placeholder="0.00"/>
                    </q-field>
                  </div>
                </div>
              </div>
              <div class="input-field center-align">
                <div class="row-m">
                  <q-btn label="Agregar otra opción" icon="add"/>
                </div>
              </div>
              <button class="primary" @click="next()" icon-right="fas fa-arrow-right">Siguiente <i class="material-icons">arrow_forward</i></button>
            </div>
          </div>
          <!-- An ad group contains one or more ads which target a shared set of keywords.
          <br><br>
          <label>
            <q-toggle v-model="ready"></q-toggle>
            Enable next step
          </label> -->
        </q-step>
        <!-- ===================================================== -->
        <!-- Gastos más fuertes -->
        <!-- ===================================================== -->
        <q-step title="egresos" :ready="ready">
          <div class="container valign-wrapper gastos">
            <div class="content">
              <h2>Gastos más fuertes</h2>
              <p>¿Cuáles son tus gastos más fuertes?</p>
              <q-field>
                <q-select
                  v-model="egreso"
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
                    <input type="radio" id="radio_semanal" name="period" value="semanal" />
                    <label for="radio_semanal">Semanal</label>
                    <input type="radio" id="radio_quincenal" name="period" value="quincenal" />
                    <label for="radio_quincenal">Quincenal</label>
                    <input type="radio" id="radio_mensual" name="period" value="mensual" />
                    <label for="radio_mensual">Mensual</label>
                  </div>
                  <div class="cantidad">
                    <q-field>
                      <q-input v-model="ingreso" type="number" prefix="$" placeholder="0.00"/>
                    </q-field>
                  </div>
                </div>
              </div>
              <div class="input-field center-align">
                <div class="row-m">
                  <q-btn label="Agregar otra opción" icon="add"/>
                </div>
              </div>
              <button class="primary" @click="next()" icon-right="fas fa-arrow-right">Siguiente <i class="material-icons">arrow_forward</i></button>
            </div>
          </div>
          <!-- An ad group contains one or more ads which target a shared set of keywords.
          <br><br>
          <label>
            <q-toggle v-model="ready"></q-toggle>
            Enable next step
          </label> -->
        </q-step>
        <!-- ===================================================== -->
        <!-- Deuda -->
        <!-- ===================================================== -->
        <q-step title="deuda" :ready="ready">
          <div class="container valign-wrapper deuda">
            <div class="content">
              <h2>¿Tienes una deuda?</h2>
              <p>Especifica tu deuda</p>
              <div class="input-field center-align">
                <q-btn
                  @click="deudaExist = true, clicked = true"
                  label="Si"
                />
                <q-btn
                  @click="deudaExist = false, clicked = true"
                  label="No"
                />
                <!-- <input type="radio" id="radio_deuda_si" name="deuda" value="1" />
                <label for="radio_deuda_si">Si</label>
                <input type="radio" id="radio_deuda_no" name="deuda" value="0" />
                <label for="radio_deuda_no">No</label> -->
              </div>
              <div class="deuda_desglose" v-if="deudaExist">
                <h2>¿De cuánto?</h2>
                <q-field>
                  <q-input v-model="deuda" type="number" prefix="$" placeholder="0.00"/>
                </q-field>
                <div class="input-field center-align">
                  <div class="row-m">
                    <div class="period">
                      <p>Frecuencia de pagos</p>
                      <input type="radio" id="radio_semanal" name="period" value="semanal" />
                      <label for="radio_semanal">Pago único</label>
                      <input type="radio" id="radio_quincenal" name="period" value="quincenal" />
                      <label for="radio_quincenal">Quincenal</label>
                      <input type="radio" id="radio_mensual" name="period" value="mensual" />
                      <label for="radio_mensual">Mensual</label>
                    </div>
                    <div class="cantidad">
                      <p>Cantidad</p>
                      <q-input v-model="deuda" type="number" prefix="$" placeholder="0.00"/>
                    </div>
                  </div>
                </div>
              </div>
              <button class="primary" @click="next()" v-bind:disabled="!isDeudaValid()">Siguiente <i class="material-icons">arrow_forward</i></button>
            </div>
          </div>
          <!-- An ad group contains one or more ads which target a shared set of keywords.
          <br><br>
          <label>
            <q-toggle v-model="ready"></q-toggle>
            Enable next step
          </label> -->
        </q-step>
        <!-- ===================================================== -->
        <!-- Metas -->
        <!-- ===================================================== -->
        <q-step title="metas" :ready="ready">
          <div class="container metas center-align">
            <div class="content">
              <h2>Metas</h2>
              <p>¿Tienes una meta financiera?</p>
              <div class="input-field center-align">
                <q-btn @click="metaExist = true, clickedmeta = true" label="Si"/>
                <q-btn @click="metaExist = false, clickedmeta = true" label="No"/>
              </div>
              <div class="metas_desglose" v-if="metaExist">
                <div class="cuanto-meta">
                  <h2>¿De cuánto?</h2>
                  <q-field>
                    <q-input v-model="meta" type="number" prefix="$" placeholder="3,000.00"/>
                  </q-field>
                </div>
                <div class="para-meta">
                  <h2>¿Para qué?</h2>
                  <q-field>
                    <q-input v-model="metaProposito" type="text" placeholder="Ejemplo. Viaje a méxico"/>
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
  </div>
</template>

<script>
import { QStepper, QStep, QStepperNavigation, QSlideTransition, QField, QInput, QSelect, QRadio, QModal, QBtn } from 'quasar'

export default {
  data () {
    return {
      ingreso: '',
      egreso: '',
      ready: false,
      finished: false,
      opened: false,
      clicked: false,
      clickedmeta: false,
      deudaExist: false,
      deuda: '',
      meta: '',
      metaProposito: '',
      metaExist: false,
      selectOptions: [
        {
          label: 'Vivienda',
          value: '1'
        },
        {
          label: 'Despensa',
          value: '2'
        },
        {
          label: 'Transporte',
          value: '3'
        },
        {
          label: 'Gustos',
          value: '4'
        },
        {
          label: 'Servicios básicos',
          value: '5'
        }
      ]
    }
  },
  methods: {
    finish () {
      this.finished = true
    },
    reset () {
      this.$refs.stepper.reset()
      this.finished = false
    },
    next () {
      this.$refs.stepper.next()
    },
    isIngresoValid: function () {
      return this.ingreso !== ''
    },
    isEgresoValid: function () {
      return this.ingreso !== ''
    },
    isDeudaValid: function () {
      if (this.clicked !== false) {
        return this.deudaExist !== ''
      }
    },
    isMetaValid: function () {
      if (this.clicked !== false) {
        if (this.metaExist !== true) {
          return this.clickedmeta !== false
        } else {
          return this.meta !== '' && this.metaProposito !== ''
        }
      }
    }
  },
  components: {
    QStepper, QStep, QStepperNavigation, QSlideTransition, QField, QInput, QSelect, QRadio, QModal, QBtn
  }
}
</script>

<style lang="scss">
  $green: #c0d84a;
  $dark-blue: #3f224c;
  $purple: #af85bc;
  $white: #ffffff;
  $pink: #e03757;

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

  .row-m {
    max-width: 500px;
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

      .q-stepper-step-content {
        position: relative;
        .ingresos {
          font-family: $nunito;
          min-height: 75vh;
          height: auto;
          .content {
            margin: 0px;
            padding: 0px;
            float: left;
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            left: 50%;

            h2 {
              font-family: $nunitobold;
              font-size: 35px;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.27;
              letter-spacing: normal;
              text-align: center;
              color: #3f224c;
            }

            p {
              font-family: $opensans;
              font-size: 20px;
              font-weight: normal;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.25;
              letter-spacing: normal;
              text-align: center;
              color: #3f224c;
            }

            button {
              position: relative;
              font-family: $nunito;
              font-size: 20px;
              font-weight: 500;
              width: 300px;
              height: 50px;
              border-radius: 15px;
              background-color: #64c9db;
              color: white;
              border: 0px;
              outliner: 0;
              cursor: pointer;
              margin-bottom: 15px;

              i {
                position: relative;
                top: 5px;
              }
            }

            .q-field {
              text-align: center;
            }

            .q-if-addon,
            .q-if-focused {
              color: $green !important;
              font-family: $nunitobold;
              font-size: 50px;
              margin: 0 5px;
            }

            .q-input {
              max-width: 350px;
              display: inline-block !important;
              float: none !important;
              margin: 8% 0;

              input.q-input-target {
                font-family: $nunitobold;
                color: $green;
                font-size: 60px;
                font-weight: bold;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: normal;
                text-align: center;
                line-height: initial;
                height: auto;
                padding-right: 40px;
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
        }
        .egresos,
        .gastos {
          min-height: 75vh;
          height: auto;

          .primary {
            margin-top: 65px;
          }

          .content {
            margin: 0px;
            padding: 0px;
            float: left;
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            left: 50%;

            h2 {
              font-family: $nunitobold;
              font-size: 35px;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.27;
              letter-spacing: normal;
              text-align: center;
              color: #3f224c;
            }

            p {
              font-family: $opensans;
              font-size: 20px;
              font-weight: normal;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.25;
              letter-spacing: normal;
              text-align: center;
              color: #3f224c;
              margin-bottom: 45px;
            }

            button {
              position: relative;
              font-family: $nunito;
              font-size: 20px;
              font-weight: 500;
              width: 300px;
              height: 50px;
              border-radius: 15px;
              background-color: #64c9db;
              color: white;
              border: 0px;
              outliner: 0;
              cursor: pointer;
              margin-bottom: 15px;

              i {
                position: relative;
                top: 5px;
              }
            }

            .q-field {
              text-align: center;
            }

            .q-select {
              min-width: 500px;
              display: inline-block !important;
              float: none !important;
              margin: 15px 0;

              .q-if-control.q-icon {
                padding-top: 12px;
                color: $dark-blue;
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
                  color: #3f224c !important;
                }

                .q-input-target {
                  color: $dark-blue;
                  font-family: $os-semibold;
                  font-size: 16px;
                }
              }

              input.q-input-target {
                font-weight: bold;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: normal;
                text-align: left;
                color: #c0d84a;
                line-height: initial;
                height: auto;
              }
            }

            .frecuencia_sub,
            .cantidad_sub {
              font-family: $os-semibold;
              font-size: 16px;
              font-weight: 600;
              text-align: left;
              color: #3f224c;
              margin: 10px 0;
              float: left;
            }

            .frecuencia_sub {
              width: 70%;
            }
            .cantidad_sub {
              width: 30%;
            }

            .period {
              margin-bottom: 60px;
              float: left;
              width: 70%;
              input[type=radio], input[type=checkbox] {
                display: none;
              }
              input[type=radio] + label, input[type=checkbox] + label {
                font-family: $os-semibold;
                display: inline-block;
                background-color: #f6f6f6;
                color: #3f224c;
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

              .q-if-addon,
              .q-if-focused {
                font-family: $nunitobold;
                color: $pink !important;
                font-size: 22px;
                margin: 0 5px;
              }

              .q-input {
                max-width: 350px;
                display: inline-block !important;
                float: none !important;

                input.q-input-target {
                  font-family: $nunitobold;
                  color: $pink;
                  font-size: 25px;
                  text-align: left;
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
                color: #af85bc;
                border: 0px;
                outline: 0;
                cursor: pointer;
                font-size: 16px;
                margin-bottom: 15px;
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
          min-height: 75vh;
          height: auto;
          .content {
            margin: 0px;
            padding: 0px;
            float: left;
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            left: 50%;

            h2 {
              font-family: $nunitobold;
              font-size: 35px;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.27;
              letter-spacing: normal;
              text-align: center;
              color: #3f224c;
              margin: 0;
            }

            p {
              font-family: $opensans;
              font-size: 20px;
              font-weight: normal;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.25;
              letter-spacing: normal;
              text-align: center;
              color: #3f224c;
              margin: 0;
              margin-bottom: 30px;
            }

            button {
              position: relative;
              font-family: $nunito;
              font-size: 20px;
              font-weight: 500;
              width: 300px;
              height: 50px;
              border-radius: 15px;
              background-color: #64c9db;
              color: white;
              border: 0px;
              outliner: 0;
              cursor: pointer;
              margin-bottom: 15px;
              margin-top: 25px;

              i {
                position: relative;
                top: 5px;
              }
            }

            input[type=radio], input[type=checkbox] {
              display: none;
            }
            /* input[type=radio] + label, input[type=checkbox] + label */
            .q-btn {
              display: inline-block;
              background-color: #f6f6f6;
              color: $dark-blue;
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
              background-color: #af85bc;
              color: $white;
            }

            input[type=radio]:checked + label, input[type=checkbox]:checked + label {
              background-color: $purple;
              color: $white;
            }

            .deuda_desglose {
              margin-top: 25px;
              h2 {
                margin: 15px 0;
              }
              .q-field {
                text-align: center;
              }

              .q-if-addon,
              .q-if-focused {
                font-family: $nunitobold;
                color: #fbbb2f !important;
                font-size: 45px;
                margin: 0 5px;
              }

              .q-input {
                font-family: $nunitobold;
                max-width: 150px;
                display: inline-block !important;
                float: none !important;
                input.q-input-target {
                  font-size: 50px;
                  font-weight: bold;
                  font-style: normal;
                  font-stretch: normal;
                  letter-spacing: normal;
                  text-align: left;
                  color: #fbbb2f;
                  line-height: initial;
                  height: auto;
                }

                input::-webkit-input-placeholder {
                  color: #fbbb2f !important;
                }
                input::-moz-placeholder {
                  color: #fbbb2f;
                }
                input:-ms-input-placeholder {
                  color: #fbbb2f;
                }
                input:-moz-placeholder {
                  color: #fbbb2f;
                }
              }
              .row-m {
                max-width: 310px;
              }

              .period {
                margin: 25px 0;
                p {
                  font-family: $os-semibold;
                  font-size: 16px;
                  font-weight: 600;
                  text-align: left;
                  margin-bottom: 13px;
                  color: #3f224c;
                }
                input[type=radio], input[type=checkbox] {
                  display: none;
                }
                input[type=radio] + label, input[type=checkbox] + label {
                  font-family: $os-semibold;
                  font-size: 14px;
                  display: inline-block;
                  background-color: #f6f6f6;
                  color: #3f224c;
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
                  color: #3f224c;
                  float: left;
                  margin: 0px;
                }
                .q-if-addon,
                .q-if-focused {
                  color: #e03757 !important;
                  font-size: 23px;
                  margin: 0 5px;
                }

                .q-input {
                  max-width: 130px;
                  float: right;
                  display: inline-block !important;
                  float: none !important;
                  input.q-input-target {
                    font-size: 25px;
                    font-weight: bold;
                    font-style: normal;
                    font-stretch: normal;
                    letter-spacing: normal;
                    text-align: right;
                    color: #e03757;
                    line-height: initial;
                    height: auto;
                  }

                  input::-webkit-input-placeholder {
                    color: #e03757 !important;
                  }
                  input::-moz-placeholder {
                    color: #e03757;
                  }
                  input:-ms-input-placeholder {
                    color: #e03757;
                  }
                  input:-moz-placeholder {
                    color: #e03757;
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

              .cuanto-meta {
                .q-if-addon,
                .q-if-focused {
                  color: $green !important;
                  font-size: 50px;
                  margin: 0 5px;
                }

                .q-input {
                  max-width: 300px;
                  display: inline-block !important;
                  float: none !important;

                  input {
                    color: $green;
                    font-size: 60px;
                    font-weight: bold;
                    font-style: normal;
                    font-stretch: normal;
                    letter-spacing: normal;
                    text-align: left;
                    line-height: initial;
                    height: auto;
                  }

                  input::-webkit-input-placeholder {
                    color: $green !important;
                  }

                  input::-moz-placeholder {
                    color: $green;
                  }

                  input::-ms-input-placeholder {
                    color: $green;
                  }

                  input:-moz-placeholder {
                    color: $green;
                  }
                }
              }

              .para-meta {
              h2 {
                margin-top: 40px;
                margin-bottom: 20px;
              }

              .q-if:before,
              .q-if:after {
                color: $dark-blue;
              }

              .q-input {
                max-width: 350px;
                display: inline-block !important;
                float: none !important;

                input {
                  font-size: 16px;
                  color: $dark-blue;
                  line-height: 1.56px;
                  text-align: center;
                }

                input::-webkit-input-placeholder {
                  color: #dedede !important;
                }

                input::-moz-placeholder {
                  color: #dedede;
                }

                input::-ms-input-placeholder {
                  color: #dedede;
                }

                input:-moz-placeholder {
                  color: #dedede;
                }
              }
              }
            }
          }
        }
      }
    }
  }
</style>
