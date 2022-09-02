import "core-js/stable";
import Vue from "vue";
import "./plugins/axios";
import App from "./App";
import router from "./router";
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { store } from "@/store/index";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import api from "@/services/api";
import VueTelInputVuetify from "vue-tel-input-vuetify/lib";

Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.prototype.$requiredRules = [(v) => !!v || "This Field is Required"];
Vue.prototype.$phoneRules = [
  (v) => !!v || "Phone is required",
  //(v) => /^\d{11}$/.test(v) || "Phone must be 11 digits",
];
Vue.prototype.$api = api;
Vue.config.performance = true;

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  vuetify,
  store,
  components: {
    App,
  },
  created() {
    this.$store.dispatch("user/validate");
  },
});
