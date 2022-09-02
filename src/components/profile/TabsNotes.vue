<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="notes" hide-default-footer>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :to="{ name: 'notes', params: { id: item.id } }"
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
    <div class="text-center pt-2 p-2">
      <v-dialog
        v-model="dialog_new_note"
        persistent
        max-width="700px"
        v-if="is_owner || is_teacher"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined v-bind="attrs" v-on="on" class="pa-2 ma-2"
            >New Note
          </v-btn>
        </template>
        <new-note
          v-bind:class_id="class_id"
          @closeDialog="new_note_close_dialog"
        >
        </new-note>
      </v-dialog>
      <v-btn outlined class="pa-2" @click="dialog_view_all = true"
        >View All</v-btn
      >
      <v-dialog v-model="dialog_view_all" max-width="1000px">
        <view-all-for-tab-item
          :headers="headers"
          :items="notes"
          @closeDialog="closeDialogViewAll"
        ></view-all-for-tab-item>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import NewNote from "../views/creation/NewNote.vue";
import ViewAllForTabItem from "./ViewAllForTabItem.vue";

export default {
  components: { NewNote, ViewAllForTabItem },
  props: ["class_id", "is_owner", "is_teacher"],
  data() {
    return {
      dialog_new_note: false,
      dialog_view_all: false,
      headers: [
        {
          text: "Title ",
          value: "name",
        },
        {
          text: "Details",
          value: "description",
        },
        {
          text: "Uploaded At",
          value: "created_at",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    notes() {
      return this.class_id
        ? this.$store.getters["notes/notes_for_current_class"](this.class_id)
        : // this.$store.state.meetings.meetings.filter(
          //     (meeting) => meeting.class_id == this.class_id
          //   )
          this.$store.getters["notes/all_note"];
    },
  },
  methods: {
    new_note_close_dialog() {
      this.dialog_new_note = false;
    },
    closeDialogViewAll() {
      this.dialog_view_all = false;
    },
  },
};
</script>

<style></style>
