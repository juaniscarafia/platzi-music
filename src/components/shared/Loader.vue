<template>
  <div class="container">
    <div class="content has-text-centered">
      <div class="bars"></div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .content {
    padding: 20px;
    min-height: 40vh;
  }

  .bars {
    margin: 0 auto;
    width: 50.4px;
    height: 50.4px;
    --c: linear-gradient(#ccccd5 0 0);
    background: var(--c), var(--c), var(--c);
    background-repeat: no-repeat;
    animation: bars-gm67spmd 1s infinite,
          bars-lof3c3md 1s infinite;
  }

  @keyframes bars-gm67spmd {
    0%, 100% {
        background-size: 10.1px 100%;
    }

    33%, 66% {
        background-size: 10.1px 40%;
    }
  }

  @keyframes bars-lof3c3md {
    0%, 33% {
        background-position: 0 0   ,50% 100%,100% 0;
    }

    66%, 100% {
        background-position: 0 100%,50% 0   ,100% 100%;
    }
  }

</style>