<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="assignments"
      :items-per-page="5"
      hide-default-footer
      class="mt-4"
    >
      <template v-slot:item.class_code="{ item }">
        <a>{{ item.class_code }}</a>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="show_details = true" v-bind="attrs" v-on="on">
              mdi-call-made
            </v-icon>
          </template>
          <span>go to class</span>
        </v-tooltip>
      </template>
      <!-- <template v-slot:item.submission="{ item }">
          <v-badge dot>{{ item.submission }}</v-badge>
        </template> -->
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :to="{ name: 'assignments', params: { id: item.id } }"
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
      <template v-slot:item.submission_date_time="{ item }">{{
        new Date(item.submission_date_time).toLocaleString("en-US")
      }}</template>
    </v-data-table>
    <v-row align="center" justify="center" class="pa-2">
      <v-dialog
        v-model="dialog_new_assignment"
        persistent
        max-width="700px"
        v-if="is_owner || is_teacher"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined v-bind="attrs" v-on="on" class="pa-2 ma-2"
            >New Assignment
          </v-btn>
        </template>
        <new-assignment
          v-bind:class_id="class_id"
          @closeDialog="new_assignment_close_dialog"
        >
        </new-assignment>
      </v-dialog>

      <v-dialog max-width="1000px" v-model="dialog_view_all">
        <template v-slot:activator="{ on, attrs }"
          ><v-btn outlined v-bind="attrs" v-on="on" class="pa-2 ma-2"
            >View All</v-btn
          ></template
        >
        <view-all-for-tab-item
          :headers="headers"
          :items="assignments"
          @closeDialog="closeDialogViewAll"
        ></view-all-for-tab-item>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import NewAssignment from "../views/creation/NewAssignment.vue";
import ViewAllForTabItem from "./ViewAllForTabItem.vue";
export default {
  components: { NewAssignment, ViewAllForTabItem },
  props: ["class_id", "is_owner", "is_teacher"],
  data() {
    return {
      dialog_view_all: false,
      dialog_new_assignment: false,
      show_details: false,
      headers: [
        // {
        //   text: "Class Code ",
        //   value: "class_code",
        // },
        {
          text: "Title ",
          value: "name",
        },

        {
          text: "Assigned On",
          value: "created_at",
        },
        {
          text: "Submission Due at",
          value: "submission_date_time",
        },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    assignments() {
      return this.class_id
        ? this.$store.getters["assignments/assignments_for_current_class"](
            this.class_id
          )
        : this.$store.getters["assignments/all_assignment"];
    },
  },
  methods: {
    new_assignment_close_dialog() {
      this.dialog_new_assignment = false;
    },
    closeDialogViewAll() {
      this.dialog_view_all = false;
    },
  },
};
</script>

<style></style>
