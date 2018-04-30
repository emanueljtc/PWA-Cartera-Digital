<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <!-- Menu -->
        <q-btn
          flat
          dense
          round class="menu-icon"
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <img src="~assets/img/moneyko-horizontal.svg" alt="MoneyKo">
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>
          <img src="~assets/img/moneyko-white.svg" alt="MoneyKo">
        </q-list-header>
        <q-item @click.native="$router.replace('/')">
          <i>
            <img src="~assets/img/icons/inicio.svg" alt="Inicio">
          </i>
          <q-item-main label="Inicio" sublabel="" />
        </q-item>
        <q-item @click.native="$router.replace('/pasos')">
          <i>
            <img src="~assets/img/icons/cuestionario.svg" alt="Cuestionario">
          </i>
          <q-item-main label="Cuestionario" sublabel="" />
        </q-item>
        <q-item @click.native="$router.replace('/presupuesto')">
          <i>
            <img src="~assets/img/icons/presupuesto.svg" alt="Presupuesto">
          </i>
          <q-item-main label="Presupuesto" sublabel="" />
        </q-item>
        <q-item @click.native="$router.replace('/ahorro')">
          <q-item-side icon="timeline" />
          <q-item-main label="Ahorro" sublabel="" />
        </q-item>

        <div class="logout-box">
          <q-item-separator />
          <q-item @click.native="logout">
            <q-item-side icon="power_settings_new" />
            <q-item-main label="Cerrar Sesión" sublabel="" />
          </q-item>
          <p>Versión 1.0</p>
        </div>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <div class="center-align">
      </div>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { openURL, QItemSeparator, QModal, QBtn } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false,
      opened: false
    }
  },
  methods: {
    openURL,
    logout () {
      this.$oauth.logout()
      this.$router.push('/login')
    }
  },
  components: {
    QItemSeparator, QModal, QBtn
  }
}
</script>

<style lang="scss">
  $dark-purple: #3f224c;
  $light-gray: #f6f6f6;
  $light-blue: #64c9db;
  $white: #ffffff;
  $gray: #f7ecfb;

  @font-face {
    font-family: Nunito;
    src: url(~assets/fonts/Nunito/Nunito-Regular.ttf);
  }
  @font-face {
    font-family: NunitoBold;
    src: url(~assets/fonts/Nunito/Nunito-Bold.ttf);
  }
  @font-face {
    font-family: OpenSans;
    src: url(~assets/fonts/OpenSans/OpenSans-Regular.ttf);
  }
  $nunito: Nunito;
  $nunitobold: NunitoBold;
  $opensans: OpenSans;

  .hide {
    display: none;
  }

  h1,h2,h3,h4,h5,h6, p {
    font-weight: normal;
    font-style: normal;
    margin: 8px 0;
    width: 100%;
    line-height: initial;
  }
  .center-align {
    text-align: center;
  }
  header {
    background-color: $white;
    text-align: center;
    height: 70px;

    .q-toolbar {
      position: relative;
      width: 90%;
      left: 5%;
      height: 70px;
      border-bottom: 1px solid $light-gray;

      .q-toolbar-title {
        position: absolute;
        left: 0;
        width: 100%;
      }

      button {
        z-index: 1;
        margin-top: 0 !important;
      }

      i {
        font-size: 24px !important;
        color: $dark-purple !important;
      }
    }
  }

  .q-layout-header {
      box-shadow: 0 0px 0px 0px rgba(0,0,0,0.2), 0 0px 0px rgba(0,0,0,0.14), 0 0px 0px rgba(0,0,0,0.12);
  }

  .q-layout-drawer {
    background-color: $dark-purple !important;
    color: $white;
    font-family: $nunitobold;

    .q-list {
      padding-top: 0px;

      .q-list-header {
        background-color: #371d43;
        text-align: center;
        padding: 30px 0;
        line-height: initial;
        margin-bottom: 43px;
      }

      .q-item {
        font-size: 18px;
        padding: 15px 16px;

        .q-item-main {
          margin: 0px;
        }

        i {
          color: $white;
          margin-right: 24px;
        }
      }

      .logout-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        .q-item-separator {
          position: relative;
          width: 80%;
          left: 5%;
        }

        p {
          font-size: 12px;
          margin-top: 15px;
          padding: 0 16px 24px 16px;
        }
      }
    }
  }

  .modal-content {
    padding: 40px 25px 28px 25px;
    h4 {
      font-family: $nunito;
      font-size: 20px;
      text-align: center;
      color: $light-blue;
      margin-bottom: 15px;
    }
    h3 {
      font-family: $opensans;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      color: $dark-purple;
      margin: 0;
    }
    p {
      font-family: $opensans;
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      color: #9b9b9b;
      margin: 0;
    }

    hr {
      border: solid 1px $gray;
    }
  }

  @media screen and (max-width: 600px) {
    header {
      height: 55px;
      .q-toolbar {
        width: 95%;
        left: 2.5%;
        height: 55px;
        border-bottom: 0px;
        padding: 0px;
      }

      img {
        display: none;
      }
    }
  }
</style>
