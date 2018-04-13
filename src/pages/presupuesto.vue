<template>
  <div>
    <div class="layout-padding center-align">
      <div class="container presupuesto">
        <div class="content">
          <img src="~assets/img/moneyko.svg" alt="MoneyKo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    font-family: NunitoBold;
    src: url(~assets/fonts/Nunito/Nunito-Bold.ttf);
  }

  @font-face {
    font-family: OpenSansSemibold;
    src: url(~assets/fonts/OpenSans/OpenSans-SemiBold.ttf);
  }

  $nunitobold: NunitoBold;
  $os-semibold: OpenSansSemibold;

  header {
    display: none
  }

  .q-layout-page-container {
    padding: 0px !important;
  }

  .layout-padding {
    position: relative;
    padding: 0;
    .presupuesto {
      display: flex;
      align-items: center;
      min-height: 100vh;
      height: auto;
      padding: 50px 5% 100px 5%;

      .content {
        text-align: center;
        margin: 0px;
        padding: 0px;
        width: 100%;
      }
    }
  }
</style>
