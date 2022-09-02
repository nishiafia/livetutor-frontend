<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4" outlined>
          <v-row justify="center">
            <v-col cols="4">
              <v-select
                :items="authorRooms"
                v-model="selected_class"
                label="Select Room"
                item-text="name"
                item-value="id"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-dialog
              v-model="dialogAssignUsersToRooms"
              width="800"
              height="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item text v-bind="attrs" v-on="on">
                  <v-icon class="px-2" color="accent">mdi-file-cog</v-icon>
                  Assign Users to Rooms
                </v-list-item>
              </template>
              <UploadOrganizationUsersRooms
                @closeDialog="closeDialog('dialogAssignUsersToRooms')"
              ></UploadOrganizationUsersRooms>
            </v-dialog>
            <v-spacer> </v-spacer>
            <v-btn color="primary" @click="$refs.room_users_table.loadData()"
              >Filter</v-btn
            >
            <v-spacer> </v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <DataTableSSR
          ref="room_users_table"
          apiEndPoint="room-users/"
          :headers="headers"
          :queryParams="queryParams"
          :showExport="true"
        ></DataTableSSR>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTableSSR from "@/components/global/DataTableSSR.vue";
import UploadOrganizationUsersRooms from "@/components/organization/create/UploadOrganizationUsersRooms.vue";
export default {
  components: { DataTableSSR, UploadOrganizationUsersRooms },
  data() {
    return {
      dialogAssignUsersToRooms: false,
      selected_class: -1,
      headers: [
        {
          text: "Name",
          value: "user.username",
        },
      ],
    };
  },
  computed: {
    queryParams() {
      return {
        ...(this.selected_class !== -1
          ? { room_id: this.selected_class }
          : null),
        // role: "student",
      };
    },
    authorRooms() {
      return [{ name: "All", id: -1 }, ...this.$store.state.classes.classes];
    },
  },
  methods: {
    closeDialog(dialog) {
      this[dialog] = false;
    },
  },
};
</script>

<style>
</style>
