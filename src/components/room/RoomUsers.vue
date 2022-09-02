<template>
  <v-data-table
    :headers="headers"
    :items="room_users"
    @input="$emit('set_users', $event)"
    show-select
  >
  </v-data-table>
</template>

<script>
export default {
  props: ["room_id", "selected_students"],
  emits: ["set_users"],
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "user.name",
        },
      ],
      room_users: [],
    };
  },
  created() {
    this.loadRoomUsers();
  },
  methods: {
    loadRoomUsers() {
      this.$api
        .get(`/rooms/${this.room_id}/users/`)
        .then((res) => {
          this.room_users = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style></style>
