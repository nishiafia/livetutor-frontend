<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-4">
          <v-card-actions>
            <v-card-title>Assign Users to Rooms</v-card-title>
            <v-spacer> </v-spacer
            ><v-btn
              tag="a"
              color="secondary"
              outlined
              dark
              href="/files/meetingme_org_user_template.csv"
              download
              >Download Template
              <v-icon color="secondary" right> mdi-download </v-icon>
            </v-btn>
          </v-card-actions>
          <v-divider class="mx-4 mb-6"></v-divider>

          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn icon @click="$emit('closeDialog')">
        <v-icon large color="red lighten-2">mdi-close-circle-outline</v-icon>
      </v-btn> -->

          <v-file-input
            v-model="user_room_csv"
            outlined
            dense
            label="Upload Users-Rooms CSV"
            @change="loadCSV"
          >
          </v-file-input>

          <v-divider></v-divider>
          <v-data-table
            class="ma-4"
            :headers="headers"
            :items="items"
          ></v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="pa-4" color="primary" @click="assignRoomUsers">
              Assign Users To Rooms
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  emits: ["close"],
  data() {
    return {
      user_room_csv: "",
      headers: [],
      items: [],
    };
  },
  computed: {},
  methods: {
    loadCSV() {
      if (this.user_room_csv) {
        const file_reader = new FileReader();
        file_reader.readAsText(this.user_room_csv);
        file_reader.onload = (e) => {
          const csv_data = e.target.result;
          const csv_user_room_data = csv_data.trim().split("\n");
          this.headers = csv_user_room_data[0]
            .split(",")
            .map((e) => ({ text: e.trim(), value: e.trim() }));
          csv_user_room_data.shift();
          this.items = csv_user_room_data.map((row) => {
            const [username, name, email, phone, password, room, role] = row
              .split(",")
              .map((e) => e.trim());
            return {
              username,
              name,
              email,
              phone,
              password,
              room,
              role,
            };
          });
        };
      } else {
        this.items = [];
        this.headers = [];
      }
    },

    assignRoomUsers() {
      this.$api
        .post("room-users/assign-bulk-room-users/", {
          room_users_data: this.items,
        })
        .then((res) => {
          this.headers = [
            ...this.headers,
            { text: "Assigned", value: "user_exist_status" },
            { text: "Error", value: "room_error" },
          ];
          this.items = res.data;
        });
    },
  },
};
</script>

<style>
</style>
