<template lang="">
  <div class="notification animated fadeIn">
    <slot name="body">Algo anduvo mal 😱</slot>
  </div>
</template>

<style lang="scss" scoped>
  .notification {
    margin: 10px;
    position: fixed !important;
    bottom: 0;
    right: 0;
    z-index: 10;
  }

  .isFound{
    background-color: #23d160;
    color: whitesmoke;
  }

  .isNotFound{
    background-color: #DA4644;
    color: whitesmoke;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }

  .animated {
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
</style>