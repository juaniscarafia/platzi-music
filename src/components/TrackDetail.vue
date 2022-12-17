<template lang="">
  <div class="containter">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card" v-if="track">
          <div class="card-image">
            <figure class="image is-1by1">
              <img :src="track[0].album.images[0].url" :alt="track[0].name">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="track[0].album.images[0].url" :alt="track[0].name">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-6">
                  <strong>{{track[0].name}}</strong>
                </p>
                <p class="subtitle is-6">
                  {{track[0].artists[0].name}}
                </p>
              </div>
            </div>
            <div class="content">
              <small>{{ convertMsToMm(track[0].duration_ms) }}</small>
              <nav class="level">
                <div class="level-left">
                  <a href="#" class="level-item">
                    <span class="icon is-small" @click="selectTrack">▶️</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import trackService from "@/services/track"
import PmTrack from "@/components/Track.vue"
export default {
  data() {
    return {
      track: {}
    }
  },
  components: { PmTrack },
  created() {
    const id = this.$route.params.id
    
    trackService.getById(id).then(res => {
      this.track = res.tracks
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
  .column {
    margin: 20px;
  }
</style>