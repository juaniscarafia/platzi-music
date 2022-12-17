<template>
  <section class="section">
    <nav class="nav">
      <div class="container is-flex">
        <input class="input is-large" type="text" placeholder="Buscar canciones" v-model="searchQuery">
        <a class="button is-info is-large" @click="search" href="#">Buscar</a>
        <a class="button is-danger is-large" href="#">&times;</a>
      </div>
      <div class="containter p-5">
        <div class="has-text-centered">
          <p>
            <small>{{ searchMessage }}</small>
          </p>
        </div>
      </div>
    </nav>
    <div class="container results">
      <div class="columns">
        <div class="column" v-for="(t, index) in tracks" :key="index">
          {{ t.data.name }} - {{ t.data.artists.items[0].profile.name }}
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
import trackService from './services/track';

// const tracks = [
//   { id: 1, name: 'Muchacha', artist: 'Luis Alberto Spinetta' },
//   { id: 2, name: 'Hoy aca en el baile', artist: 'El Pepo' },
//   { id: 3, name: 'I was made for loving you', artist: 'Kiss' }
// ];

export default {
  data() {
    return {
        searchQuery: "",
        tracks: []
    };
  },
  computed: {
    searchMessage() {
        return `Encontrados: ${this.tracks.length}.`;
    }
  },
  methods: {
    search() {
      if (!this.searchQuery) { return }

      trackService.search(this.searchQuery).then(res => {
        this.tracks = res
      })
    }
  },
  components: { PmFooter, PmHeader }
}
</script>



<style lang="scss" scoped>
  @import "./scss/main.scss";
  .results{
    margin-top: 50px;
  }
</style>
  