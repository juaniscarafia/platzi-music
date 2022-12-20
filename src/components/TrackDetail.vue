<template lang="">
  <div class="containter" v-if="track && track[0]">
    <div class="columns">
      <div class="column is-3 has-text-centered">
        <figure class="media-left">
          <p class="image">
            <img :src="track[0].album.images[0].url" :alt="track[0].name">
          </p>
          <p class="button-bar">
            <a href="" class="button is-primary is-large">
              <span class="icon" @click="selectTrack">▶</span>
            </a>
          </p>
        </figure>
      </div>
      <div class="column is-8">
        <div class="panel">
          <div class="panel-heading">
            <!-- <h1 class="title">{{track[0].name}}</h1> -->
            <h1 class="title">{{trackTitle}}</h1>
          </div>
          <div class="panel-block">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <ul v-for="(v,k) in track">
                    <li>
                      <strong>{{ k }}&nbsp;</strong>
                      <span>{{ v }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <nav class="level">
                <div class="level-left">
                  <a href="" class="level item"></a>
                </div>
              </nav>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 
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
-->
</template>

<script>
// import trackService from "@/services/track"
import trackMixin from '@/mixins/track';
// import PmTrack from "@/components/Track.vue"
import { mapState, mapActions, mapGetters } from "vuex";


export default {
  mixins: [ trackMixin ],
  // data() {
  //   return {
  //     track: {}
  //   }
  // },
  // components: { PmTrack },
  computed: {
    ...mapState(['track']),
    ...mapGetters(['trackTitle'])
  },
  created() {
    const id = this.$route.params.id
    
    // trackService.getById(id).then(res => {
    //   this.track = res.tracks
    // })
    if (!this.track || !this.track.data.id || !this.track.data.id !== id) {
      this.getTrackById({ id }).then(() => {
        console.log('Track loaded!')
      })
    }

  },
  methods: {
    ...mapActions(['getTrackById']),
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
  .button-bar {
    margin-top: 20px;
  }
</style>