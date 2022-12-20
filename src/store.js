import { createStore } from "vuex";
import trackService from "@/services/track";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      track: {},
    };
  },
  getters: {
    trackTitle(state) {
      if (!state.track) {
        return "";
      }
      return state.track.data
        ? `${state.track.data.name} - ${state.track.data.artists.items[0].profile.name}`
        : `${state.track[0].name} - ${state.track[0].artists[0].name}`;
    },
  },
  mutations: {
    setTrack(state, track) {
      state.track = track;
    },
  },
  actions: {
    getTrackById(context, payload) {
      return trackService.getById(payload.id).then((res) => {
        context.commit("setTrack", res.tracks);
        return res.tracks;
      });
    },
  },
});

export default store;
