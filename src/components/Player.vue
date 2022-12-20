<template lang="">
  <div v-if="track && (track.data || track[0])" class="content">
    <p>
      <img :src="track.data ? track.data.albumOfTrack.coverArt.sources[0].url : track[0].album.images[0].url" :alt="track.data ? track.data.albumOfTrack.name : track[0].name">
    </p>
    <p>
      <strong >{{track.data ? track.data.albumOfTrack.name : track[0].name}}</strong>
      <small>[{{ convertMsToMm(track.data ? track.data.duration.totalMilliseconds: track[0].duration_ms) }}]</small>
    </p>
    <p>
      <audio src="" controls="">

      </audio>
    </p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    // data(){
    //   return {
    //     track: {
          
    //     }
    //   }
    // },
    // created() {
    //   this.$bus.on('set-track', (track) => {
    //     this.track = track
    //   })
    // },
    computed: {
      ...mapState(['track'])
    },
    methods: {
      convertMsToMm(ms) {
        const min = Math.floor(ms / 60000);
        const sec = ((ms % 60000) / 1000).toFixed(0);

        return `${min}:${sec}`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  img {
    width: 124px;
    border-radius: 50%;
  }
</style>