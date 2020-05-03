import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      meta: {
        public: true,
      },
      component: () => import("./components/Login.vue"),
    },
    {
      path: "/",
      name: "main",
      component: () => import("./components/Main.vue"),
    },
  ],
});

export default router;
