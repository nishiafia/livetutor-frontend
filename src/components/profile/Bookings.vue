<template>
  <v-card>
    <v-app-bar>
      <v-app-bar-title>Manage and Response to your Bookings</v-app-bar-title>
    </v-app-bar>

    <v-data-table :items="items"></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Role",
          value: "role",
        },
      ],
      items: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$axios
        .get("/booking/bookings-for-teacher/")
        .then((res) => (this.items = res.data));
    },
  },
};
</script>

<style>
</style>
