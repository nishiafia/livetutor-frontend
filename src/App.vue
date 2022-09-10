<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main class="zindex">
      <router-view />
    </v-main>
    <div class="watermark">Meeting Me</div>
    <v-footer color="#B1D0E0" padless>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Meeting Me</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
  name: "App",
};
</script>
'
<style lan="scss">
.zindex {
  z-index: 3;
}
.watermark {
  position: fixed;
  bottom: 115px;
  right: 115px;
  opacity: 0.5;
  z-index: 1;
  color: rgb(202, 190, 190);
}
</style>
