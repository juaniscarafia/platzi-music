<template>
  <main>
    <!-- <Transition name="move"> -->
    <PmNotification v-show="showNotification" :class="{'is-success': isFound, 'is-danger': !isFound}">
      <template v-slot:body>
        <p>{{ isFound ? `Se encontraron ${this.tracks.length} resultados 😊` : 'No se encontraron resultados 😔' }}</p>
      </template>
    </PmNotification>
    <!-- </Transition> -->
    <Transition name="move">
      <PmLoader v-show="isLoading"/>
    </Transition>
    <section class="section"  v-show="!isLoading">
      <nav class="nav">
        <div class="container is-flex">
          <input class="input is-large" type="text" placeholder="Buscar canciones" v-model="searchQuery" @keyup.enter="search">
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
        <div class="columns is-multiline">
          <div class="column is-one-quarter" v-for="(t, index) in tracks" :key="index">
            <PmTrack :class="{ 'is-active': t.data.id === selectedTrack }" :track="t" @select="setSelectedTrack" v-blur="t.preview_url"/>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PmTrack from '@/components/Track.vue';
import PmLoader from '@/components/shared/Loader2.vue';
import PmNotification from '@/components/shared/Notification.vue';

import trackService from '@/services/track';

export default {
  data() {
    return {
        searchQuery: "",
        tracks: [],
        isLoading: false,
        showNotification: false,
        selectedTrack: '',
        isFound: false
    };
  },
  computed: {
    searchMessage() {
      return `Encontradas: ${this.tracks.length} canciones.`;
    }
  },
  watch: {
    showNotification() {
      if(this.showNotification){
        setTimeout(() => {
          this.showNotification = !this.showNotification
          if(this.isFound) this.isFound = !this.isFound
        }, 3000)
      }
    }
  },
  methods: {
    search() {
      if (!this.searchQuery) { return }

      this.isLoading = true

      trackService.search(this.searchQuery).then(res => {
        if(res.tracks.totalCount > 0){
          this.isFound = true
        }
        this.showNotification = res.tracks.totalCount === 0 || this.isFound
        this.tracks = res.tracks.items
        this.isLoading = false
      })
    },
    setSelectedTrack(id) {
      this.selectedTrack = id
    }
  },
  components: { 
    PmTrack,
    PmLoader,
    PmNotification
  }  
}
</script>

<style lang="scss" scoped>
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
