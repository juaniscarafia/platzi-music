import { createApp } from "vue";
import App from "@/App.vue";

import router from "@/routes";
import { EmitterBus } from "vue-emitter-bus";
import blur from "@/directives/blur"

import "@/scss/main.scss";

const app = createApp(App);

app.use(router);
app.use(EmitterBus);

app.directive('blur', blur);

app.mount("#app");