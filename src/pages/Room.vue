<template>
  <v-container>
    <v-row>
      <v-col lg="8" cols="12">
        <schedules :class_id="class_id"></schedules>
      </v-col>

      <v-col lg="4" cols="12">
        <v-row>
          <v-col cols="12">
            <class-description :class_id="class_id"></class-description>
          </v-col>
        </v-row>
        <v-row
          ><v-col cols="12"><user-tabs :class_id="class_id"></user-tabs></v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" cols="12"
        ><activities :class_id="class_id"></activities
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import TabsAssignments from "../components/profile/TabsAssignments.vue";
import Schedules from "../components/profile/Schedules.vue";
import TabsExams from "../components/profile/TabsExams.vue";
import TabsNotes from "../components/profile/TabsNotes.vue";
import Activities from "../components/room/Activities.vue";
import ClassDescription from "../components/room/ClassDescription.vue";
import EnrolledUsers from "../components/room/EnrolledUsers.vue";
import UserTabs from "../components/profile/UserTabs.vue";
export default {
  name: "Room",
  components: {
    Schedules,
    TabsAssignments,
    TabsExams,
    Activities,
    ClassDescription,
    EnrolledUsers,
    TabsNotes,
    UserTabs,
  },
  data: () => ({
    dialog: false,
  }),

  computed: {
    class_id() {
      return this.$route.params.id;
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
