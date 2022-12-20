<template>
  <div class="card" v-if="track && track.data">
    <div class="card-image">
      <figure class="image is-1by1">
        <img :src="track.data.albumOfTrack.coverArt.sources[0].url" :alt="track.data.albumOfTrack.name">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="track.data.albumOfTrack.coverArt.sources[0].url" :alt="track.data.albumOfTrack.name">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-6">
            <strong>{{ trim(track.data.name,20) }}</strong>
          </p>
          <p class="subtitle is-6">
            {{ trim(track.data.artists.items[0].profile.name, 20) }}
          </p>
        </div>
      </div>
      <div class="content">
        <small>{{ convertMsToMm(track.data.duration.totalMilliseconds) }}</small>
        <nav class="level">
          <div class="level-left">
            <button href="#" class="level-item button is-primary">
              <span class="icon is-small" @click="selectTrack">▶️</span>
            </button>
            <button href="#" class="level-item button is-warning">
              <span class="icon is-small" @click="goToTrack(track.data.id)">📔</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import trackMixin from '@/mixins/track';
  export default {
    mixins: [ trackMixin ],
    props: {
      track: {
        type: Object, 
        required: true
      }
    },
    methods: {
      // selectTrack() {
      //   if (!this.track.preview_url) { return }
      //   this.$emit('select', this.track.data.id)
      //   this.$bus.emit('set-track', this.track)
      // },
      goToTrack(id) {
        // if (!this.track.preview_url) { return }
        this.$router.push({ name: 'track', params: { id } })
      },
      convertMsToMm(ms) {
        const min = Math.floor(ms / 60000);
        const sec = ((ms % 60000) / 1000).toFixed(0);

        return `${min}:${sec}`;
      },
      trim(s,len) {
        if(!len) len = 50;
        if(s.length < len) return s;
        return s.substring(0,len-3) + '...';
      }
    },
    filters: {
      
    }
  }
</script>

<style lang="scss">
    
</style>