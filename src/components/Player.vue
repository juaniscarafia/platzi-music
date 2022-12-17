<template lang="">
  <div v-if="track && track.data" class="content">
    <p>
      <img :src="track.data.albumOfTrack.coverArt.sources[0].url" :alt="track.data.albumOfTrack.name">
    </p>
    <p>
      <strong >{{track.data.albumOfTrack.name}}</strong>
      <small>[{{ convertMsToMm(track.data.duration.totalMilliseconds) }}]</small>
    </p>
    <p>
      <audio src="" controls="">

      </audio>
    </p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        track: {
          
        }
      }
    },
    created() {
      this.$bus.on('set-track', (track) => {
        this.track = track
      })
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