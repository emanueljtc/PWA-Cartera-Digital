<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <!-- <q-icon name="menu" /> -->
          <q-icon name="arrow_back" />
        </q-btn>

        <q-toolbar-title>
          <img src="~assets/img/moneyko-horizontal.svg" alt="MoneyKo">
        </q-toolbar-title>

        <q-btn round
          @click="opened = true"
          label="Close"
          icon="help"
          class="help"
        />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <!-- <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="$router.replace({name : 'app.home'})">
          <q-item-side icon="home" />
          <q-item-main label="Home" sublabel="" />
        </q-item>
        <q-item @click.native="$router.replace({name : 'app.dbusers'})">
          <q-item-side icon="person" />
          <q-item-main label="Users" sublabel="Users stored in indexedDB" />
        </q-item>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
        <q-item-separator />
        <q-item @click.native="logout">
          <q-item-side icon="exit_to_app" />
          <q-item-main label="Log out" sublabel="" />
        </q-item> -->
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <div class="center-align">
      </div>
      <router-view />
    </q-page-container>

    <q-modal v-model="opened">
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
    font-family: OpenSans;
    src: url(~assets/fonts/OpenSans/OpenSans-Regular.ttf);
  }
  $nunito: Nunito;
  $opensans: OpenSans;

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

      button {
        margin-top: 0 !important;
      }

      i {
        font-size: 24px !important;
        color: $dark-purple !important;
      }
    }

    img {
      left: -23px;
      position: relative;
    }
  }

  .q-layout-header {
      box-shadow: 0 0px 0px 0px rgba(0,0,0,0.2), 0 0px 0px rgba(0,0,0,0.14), 0 0px 0px rgba(0,0,0,0.12);
  }

  .help {
    box-shadow: 0px 0px 0px 0px !important;
    background: transparent;
    width: 25px;
    height: 25px;
  }

  .modal-content {
    padding: 20px 25px 28px 25px;
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

      .help {
        position: absolute;
        top: 8px;
        left: calc(50% - 12.5px);
      }

      img {
        display: none;
      }
    }
  }
</style>
