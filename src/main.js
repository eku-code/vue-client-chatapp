import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Notifications from "vue-notification";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  Notifications,
  render: (h) => h(App),
}).$mount("#app");
