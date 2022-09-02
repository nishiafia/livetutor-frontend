<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="exams"
      :items-per-page="5"
      hide-default-footer
      class="p-2"
    >
      <template v-slot:item.start_date_time="{ item }">
        {{ new Date(item.start_date_time).toLocaleString("en-US") }} </template
      ><template v-slot:item.end_date_time="{ item }">
        {{ new Date(item.end_date_time).toLocaleString("en-US") }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :to="{ name: 'exams', params: { id: item.id } }"
              icon
              v-on="on"
              v-bind:attrs="attrs"
            >
              <v-icon> mdi-call-made </v-icon>
            </v-btn>
          </template>
          <span>Go for detail</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-row align="center" justify="center" class="pa-2">
      <v-dialog
        v-model="dialog_new_exam"
        width="700"
        persistent
        v-if="is_owner || is_teacher"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined v-bind="attrs" v-on="on" class="pa-2 ma-2"
            >New Exam
          </v-btn>
        </template>
        <new-exam
          v-bind:class_id="class_id"
          @closeDialog="new_exam_close_dialog"
        >
        </new-exam>
      </v-dialog>
      <v-btn class="pa-2 ma-2" outlined @click="dialog_view_all = true"
        >View All</v-btn
      >
      <v-dialog v-model="dialog_view_all" max-width="1000px">
        <view-all-for-tab-item
          :headers="headers"
          :items="exams"
          @closeDialog="closeDialogViewAll"
        ></view-all-for-tab-item>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import NewExam from "../views/creation/NewExam.vue";
import ViewAllForTabItem from "./ViewAllForTabItem.vue";
export default {
  components: { NewExam, ViewAllForTabItem },
  props: ["class_id", "is_owner", "is_teacher"],
  data() {
    return {
      dialog_view_all: false,
      dialog_new_exam: false,
      headers: [
        {
          text: "Title",
          value: "name",
        },
        {
          text: "Room",
          value: "room",
        },
        // {
        //   text: "Date",
        //   value: "exam_date",
        // },
        {
          text: "Starts at",
          value: "start_date_time",
        },
        {
          text: "Ends at",
          value: "end_date_time",
        },
        {
          text: "Details",
          value: "description",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    exams() {
      return this.class_id
        ? this.$store.getters["exams/exams_for_current_class"](this.class_id)
        : this.$store.getters["exams/all_exam"];
    },
  },
  methods: {
    new_exam_close_dialog() {
      this.dialog_new_exam = false;
    },
    closeDialogViewAll() {
      this.dialog_view_all = false;
    },
  },
};
</script>

<style></style>
