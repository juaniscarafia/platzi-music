const eventBus = {};

eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue();
};

// import { EmitterBus } from "vue-emitter-bus"
// export default EmitterBus;

export default eventBus;
