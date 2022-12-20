const trackMixin = {
  methods: {
    selectTrack() {
      // if (!this.track.preview_url) {
      //   return;
      // }
      //this.$emit("select", this.track.data.id);
      //this.$bus.emit("set-track", this.track);
      // VUEX STORE
      this.$store.commit("setTrack", this.track);
    },
  },
};

export default trackMixin;
