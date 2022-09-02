<template>
  <v-card height="300">
    <v-toolbar color="secondary" flat dark>
      <v-toolbar-title v-html="class_info.name"></v-toolbar-title>

      <v-chip
        v-for="(category, index) in class_info.categories"
        :key="index"
        class="mx-1"
        color="third"
        v-html="category.name"
      ></v-chip>
      <v-spacer></v-spacer>
      <v-menu v-if="class_info.is_author">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-dialog v-model="dialogEditClassDescription" width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item text v-bind="attrs" v-on="on" link
                ><v-icon class="px-2" color="accent">mdi-note-edit</v-icon
                >Update Room Information
              </v-list-item>
            </template>

            <edit-class-description
              :class_info="class_info"
            ></edit-class-description>
          </v-dialog>
          <v-dialog v-model="dialog" width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item text v-bind="attrs" v-on="on" link
                ><v-icon class="px-2" color="accent"
                  >mdi-calendar-multiple</v-icon
                >Update Room Meetings
              </v-list-item>
            </template>
            <edit-meeting :class_id="class_info.id"></edit-meeting>
          </v-dialog>
          <v-dialog v-model="dialogInvite" width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item text v-bind="attrs" v-on="on" link
                ><v-icon class="px-2" color="accent"
                  >mdi-account-multiple</v-icon
                >Manage Room Attendants
              </v-list-item>
            </template>
            <enrolled-students :class_id="class_id"></enrolled-students>
          </v-dialog>
          <v-list-item
            text
            v-bind="attrs"
            v-on="on"
            link
            :to="{ name: 'fees', params: { id: class_info.id } }"
            ><v-icon class="px-2" color="accent">mdi-credit-card-outline</v-icon
            >Manage Room Payments<v-icon class="px-2" color="accent"
              >mdi-arrow-top-right</v-icon
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-row>
      <!-- <v-col cols="12" md="6">
        <v-card height="120">
          <v-card-title
            >Total Students: {{ class_info.user.length }}</v-card-title
          >
        </v-card> </v-col
      > -->
      <!-- <v-col cols="12" md="6">
        <v-card height="120"> </v-card>
      </v-col> -->
    </v-row>
  </v-card>
</template>

<script>
import EditMeeting from "./ClassMeetings.vue";
import EditClassDescription from "@/components/views/edit/EditClassDescription.vue";
import EnrolledStudents from "./EnrolledUsers.vue";

export default {
  components: { EditMeeting, EditClassDescription, EnrolledStudents },
  props: ["class_id"],
  data() {
    return {
      class_info: {},
      dialogEditClassDescription: false,
      dialog: false,
      dialogInvite: false,
    };
  },
  created() {
    this.class_info = this.$store.getters["classes/get_current_class_info"](
      this.class_id
    );
    // this.class_info = this.$store.getters[
    //   "assignments/assignments_for_current_class"
    // ](this.class_id);
  },
  methods: {
    deleteRoom() {
      this.$store.dispatch("classes/delete", { id: this.class_id });
    },
  },
};
</script>

<style></style>
