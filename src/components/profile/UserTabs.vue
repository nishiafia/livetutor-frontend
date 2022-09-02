<template>
  <v-card>
    <v-toolbar dark color="third"
      ><v-toolbar-title>At a glance</v-toolbar-title></v-toolbar
    >
    <v-tabs color="light-yellow" right>
      <v-tab>Notes</v-tab>
      <v-tab>Links</v-tab>
      <v-tab>Assignments</v-tab>

      <v-tab>Exams</v-tab
      ><v-tab-item
        ><TabsNotes
          :class_id="class_id"
          :is_owner="is_owner(class_id)"
          :is_teacher="is_teacher(class_id)"
        ></TabsNotes
      ></v-tab-item>
      <v-tab-item>
        <TabsLinks
          :class_id="class_id"
          :is_owner="is_owner(class_id)"
          :is_teacher="is_teacher(class_id)"
        ></TabsLinks>
      </v-tab-item>
      <v-tab-item
        ><tabs-assignments
          :class_id="class_id"
          :is_owner="is_owner(class_id)"
          :is_teacher="is_teacher(class_id)"
        ></tabs-assignments
      ></v-tab-item>

      <v-tab-item
        ><tabs-exams
          :class_id="class_id"
          :is_owner="is_owner(class_id)"
          :is_teacher="is_teacher(class_id)"
        ></tabs-exams
      ></v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import TabsAssignments from "./TabsAssignments.vue";
import TabsExams from "./TabsExams.vue";
import TabsNotes from "./TabsNotes.vue";
import TabsLinks from "./TabsLinks.vue";
import { mapGetters } from "vuex";

export default {
  components: { TabsAssignments, TabsNotes, TabsExams, TabsLinks },
  props: ["class_id"],
  computed: {
    ...mapGetters({
      is_owner: "classes/is_class_owner",
      is_teacher: "classes/is_class_teacher",
    }),
  },
};
</script>
