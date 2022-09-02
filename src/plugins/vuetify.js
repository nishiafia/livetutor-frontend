import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
    values: {
      "flagBD":
      {
        component: () => import("@/icons/flags/FlagBD.vue"),
      }
    },
  },

  theme: {
    themes: {
      light: {
        primary: "#1a374d",
        secondary: "#406882",
        third: "#6998AB",
        accent: "#6998AB",
        error: "#b71c1c",
      },
    },
  },
});
