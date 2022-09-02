<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <schedules></schedules>
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col>
            <user-menu></user-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <upcoming-meetings></upcoming-meetings>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="my-4">
      <v-col cols="12">
        <RoomList></RoomList>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col> </v-col>
    </v-row>
    <v-row><v-col></v-col></v-row> -->
    <!-- <v-row class="p-2"><user-card></user-card> </v-row> -->
    <!-- <v-row class="mt-4">
      <v-col>
        <v-row>
          <v-col> </v-col>
        </v-row>
        <v-row>
          <v-col> </v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-col>
            <user-tabs></user-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import UserTabs from "@/components/profile/UserTabs.vue";
import RoomList from "@/components/profile/RoomList.vue";
import UpcomingMeetings from "@/components/profile/UpcomingMeetings.vue";

import Schedules from "@/components/profile/Schedules.vue";
import CreateListingProfile from "@/components/profile/forms/CreateListingProfile.vue";
import UserMenu from "../components/profile/UserMenu.vue";
export default {
  components: {
    RoomList,
    UpcomingMeetings,
    CreateListingProfile,
    Schedules,
    UserTabs,
    UserMenu,
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="sass"
    CreateListingProfile></style>
