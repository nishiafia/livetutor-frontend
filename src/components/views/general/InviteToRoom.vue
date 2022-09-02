<template>
  <v-card class="p-4">
    <v-combobox
      v-model="userEmails"
      label="Enter Recipient Email"
      hint="you can enter multiple email"
      multiple
      chips
    ></v-combobox>
    <v-checkbox v-model="is_trial" label="Add for Trial Schedules"></v-checkbox>
    <v-data-table
      v-if="is_trial"
      v-model="selected"
      :headers="headers"
      :items="meetings"
      item-key="id"
      show-select
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Select Meetings</v-toolbar-title>
        </v-toolbar></template
      >
    </v-data-table>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="addToRoom"> Add to Room</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/services/api";
export default {
  props: ["class_id"],
  data() {
    return {
      userEmails: [],
      is_trial: false,
      selected: [],
      headers: [
        {
          text: "Meeting Title",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Starts At", value: "starts_at" },
        { text: "Ends At", value: "ends_at" },
      ],
    };
  },
  computed: {
    meetings() {
      return this.class_id
        ? this.$store.getters["meetings/meetings_for_current_class"](
            this.class_id
          )
        : null;
    },
  },
  methods: {
    addToRoom() {
      const room_id = this.class_id;
      api
        .post(`/rooms/${room_id}/users/`, {
          room_id: this.class_id,
          user_emails: this.userEmails,
          trial: this.is_trial,
          meetings: this.is_trial
            ? this.selected.map((meeting) => meeting.id)
            : null,
        })
        .then((r) => console.log(r));
    },
  },
};
</script>

<style>
</style>
