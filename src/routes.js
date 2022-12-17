import { createRouter, createWebHistory } from "vue-router";
import Search from "@/components/Search.vue";
import About from "@/components/About.vue";
import TrackDetail from "@/components/TrackDetail.vue";

const routes = [
  {
    path: "/",
    name: "search",
    component: Search,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/track/:id",
    name: "track",
    component: TrackDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
