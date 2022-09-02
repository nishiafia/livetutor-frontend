<template>
  <v-card>
    <v-card-title> Update Room Meetings</v-card-title>
    <v-card-subtitle class="px-6">*click on column to update</v-card-subtitle>

    <v-data-table class="mt-4" :headers="headers" :items="meetings">
      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          large
          persistent
          @save="save(props.item)"
        >
          <div>{{ props.item.name }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Update Name</div>
            <v-text-field
              v-model="props.item.name"
              label="Edit"
              single-line
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.description="props">
        <v-edit-dialog
          :return-value.sync="props.item.description"
          large
          persistent
          @save="save(props.item)"
        >
          <div>{{ props.item.description }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Update Description</div>
            <v-text-field
              v-model="props.item.description"
              label="Edit"
              single-line
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.meeting_date="props">
        <v-edit-dialog
          :return-value.sync="props.item.meeting_date"
          large
          persistent
          @save="save(props.item)"
        >
          <div>{{ props.item.meeting_date }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Update Meeting Date</div>
            <v-date-picker
              v-model="props.item.meeting_date"
              label="Edit"
            ></v-date-picker>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.start_time="props">
        <v-edit-dialog
          :return-value.sync="props.item.start_time"
          large
          persistent
          @save="save(props.item)"
        >
          <div>{{ props.item.start_time }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Update Meeting Start Time</div>
            <v-time-picker
              v-model="props.item.start_time"
              label="Edit"
            ></v-time-picker>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.end_time="props">
        <v-edit-dialog
          :return-value.sync="props.item.end_time"
          large
          persistent
          @save="save(props.item)"
        >
          <div>{{ props.item.end_time }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Update Meeting End Time</div>

            <v-time-picker v-model="props.item.end_time" label="Edit">
            </v-time-picker>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="deleteItem(item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import EditMeeting from "../views/edit/EditMeeting.vue";
export default {
  components: { EditMeeting },
  props: ["class_id"],
  name: "ClassMeetings",
  data() {
    return {
      dialogEditMeeting: false,
      headers: [
        {
          text: "Title",
          value: "name",
        },
        {
          text: "Description",
          value: "description",
        },
        {
          text: "Date",
          value: "meeting_date",
        },
        {
          text: "Starts at",
          value: "start_time",
        },
        {
          text: "Ends at",
          value: "end_time",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      meetings: [],
    };
  },
  created() {
    this.meetings = this.$store.getters["meetings/meetings_for_current_class"](
      this.class_id
    );
  },
  methods: {
    editItem(item) {
      this.$store.dispatch("meetings/update", item);
    },

    deleteItem({ id }) {
      this.$store.dispatch("meetings/delete", { id });
    },
    save(item) {
      this.$store.dispatch("meetings/update", item);
    },
  },
};
</script>

<style>
</style>
