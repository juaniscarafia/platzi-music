<template>
  <PmHeader />
  <router-view />
  <PmFooter />
</template>

<script>
import PmHeader from '@/components/Layout/Header2.vue';
import PmFooter from '@/components/Layout/Footer.vue';

export default {
  components: { 
    PmFooter, 
    PmHeader,
  }
}
</script>

<style lang="scss" scoped>
  @import "@/scss/main.scss";
  .results{
    margin-top: 50px;
  }

  .is-active{
    border: 3px #48c78e solid;
  }

  .section {
    min-height: 576px;
  }
</style>
