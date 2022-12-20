import { createApp } from "vue";
import App from "@/App.vue";

import router from "@/routes";
import { EmitterBus } from "vue-emitter-bus";
import blur from "@/directives/blur";
import store from "@/store";

import "@/scss/main.scss";

const app = createApp(App);

app.use(router);
app.use(EmitterBus);
app.use(store);

app.directive("blur", blur);

app.mount("#app");
