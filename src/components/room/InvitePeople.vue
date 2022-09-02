<template>
  <v-card class="pa-4">
    <v-card-title>Invite to Your Room</v-card-title>
    <v-text-field
      v-model="item"
      hint="comma to separate"
      label="Enter user email(s)"
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  data() {
    return { item: "", items: [] };
  },
  methods: {
    addToList(event) {},
  },
};
</script>

<style>
</style>
