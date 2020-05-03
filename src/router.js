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
      children: [
        {
          path: "/",
          name: "myprofile",
          component: () => import("./components/MyProfile.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("./components/About.vue"),
        },
        {
          path: "/userlist",
          name: "userlist",
          component: () => import("./components/UserList.vue"),
        },
        {
          path: "user/:userId",
          name: "user",
          component: () => import("./components/User.vue"),
          props: true,
        },
      ],
    },
  ],
});

export default router;
