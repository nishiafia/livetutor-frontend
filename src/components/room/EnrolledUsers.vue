<template>
  <v-card>
    <v-app-bar color="#406882" dark scroll-target="#scrolling-techniques-6">
      <v-toolbar-title>Room Attendants</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialogInviteToRoom" width="800" height="800">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <invite-to-room :class_id="class_id"></invite-to-room>
      </v-dialog>
    </v-app-bar>
    <v-list>
      <DataTableSSR
        :apiEndPoint="`rooms/${this.class_id}/users/`"
        :headers="usersHeaders"
        :instantLoad="true"
        ><template #[`item.actions`]="{ item }">
          <v-btn icon @click="removeUser(item)">
            <v-icon small color="red lighten-2">mdi-delete</v-icon>
          </v-btn>
        </template></DataTableSSR
      >
    </v-list>
  </v-card>
</template>

<script>
import api from "@/services/api";
import InviteToRoom from "../views/general/InviteToRoom.vue";
import DataTableSSR from "../global/DataTableSSR.vue";
export default {
  components: { InviteToRoom, DataTableSSR },
  props: ["class_id", "class_owner"],
  data() {
    return {
      users: [],
      dialogInviteToRoom: false,
      usersHeaders: [
        { text: "Name", value: "user.name" },
        { text: "Email", value: "user.email" },
        { text: "Role", value: "role" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  created() {},
  methods: {
    loadRoomUsers() {
      return api
        .get(`rooms/${this.class_id}/users/`)
        .then((res) => (this.users = res.data));
    },
    removeUser(user) {
      api.delete(`rooms/${this.class_id}/users/${user.user.id}`).then((res) => {
        this.users = this.users.filter((u) => u.user.id !== user.user.id);
      });
    },
  },
};
</script>

<style>
</style>
