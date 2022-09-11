<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="meeting me Logo"
          src="@/assets/logo-meetingme.png"
          transition="scale-transition"
          height="150px"
          contain
        />
      </div>

      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down">
        <v-btn v-for="nav in navs" :key="nav.title" :to="nav.path" text>
          <span class="mr-2">{{ nav.title }}</span>
        </v-btn>
      </div>
      <v-divider vertical class="mx-2"></v-divider>
      <div v-if="loggedIn">
        <v-btn to="/profile" text>{{
          $store.state.user.username || "Anon"
        }}</v-btn>
        <v-btn text to="/logout">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn v-for="nav in user_nav" :key="nav.title" :to="nav.path" text>
          {{ nav.title }}
        </v-btn>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        :hidden="sidebar"
        @click="sidebar = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="sidebar" app temporary>
      <v-list nav dense>
        <v-list-item-group>
          <!-- <v-list-item
            v-for="nav in nav_user"
            :key="nav.name"
            :to="nav.path"
            text
          >
            <span class="mr-2">{{ nav.name }}</span>
          </v-list-item> -->

          <v-list-item v-for="nav in navs" :key="nav.title" :to="nav.path" text>
            <span class="mr-2">{{ nav.title }}</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",

  data() {
    return {
      sidebar: false,
      appTitle: "Meeting Me",
      logged_user_nav: [
        { title: this.username, path: "/profile" },
        { title: "Logout", path: "/logout" },
      ],
      user_nav: [
        { title: "Login", path: "/login" },
        { title: "Register", path: "/register" },
      ],
      navs: [
        { title: "Home", path: "/" },
        //TODO: remove profile(duplicate)
        { title: "Profile", path: "/profile" },
        { title: "Payment", path: "/payment" },
      ],
    };
  },
  // data() {
  //   return {
  //     user: "",
  //   };
  // },
  computed: {
    ...mapGetters({
      username: "user/getUsername",
      loggedIn: "user/userIsAuthenticated",
    }),
  },
  methods: {
    handleLogout() {
      this.$store.commit("user/logout");
    },
  },
};
</script>

<style></style>
