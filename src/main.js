import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Notifications from "vue-notification";
import VueNativeSock from "vue-native-websocket";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  Notifications,
  render: (h) => h(App),
}).$mount("#app");
Vue.use(VueNativeSock, "ws://192.168.1.64:9090/gs-guide-websocket", {
  connectManually: true,
});
