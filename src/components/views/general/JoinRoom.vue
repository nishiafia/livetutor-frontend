<template>
  <v-card class="pa-2">
    <v-card-title class="p-0">Join a Room by Code</v-card-title>

    <v-text-field mod label="Enter Room Code" v-model="code"></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('closeDialog')" text color="red lighten-2  "
        >Close</v-btn
      >
      <v-btn @click="joinClass" text color="green lighten-2">Join</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/services/api";
export default {
  emits: ["closeDialog"],
  data() {
    return {
      code: "",
    };
  },
  methods: {
    joinClass() {
      this.$api.post("/rooms/join/", { code: this.code }).then(() => {
        this.$store.dispatch("classes/get");
        this.code = "";
        this.$emit("closeDialog");
      });
    },
  },
};
</script>

<style></style>
