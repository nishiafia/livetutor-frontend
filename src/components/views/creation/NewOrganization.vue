<template>
  <v-card>
    <v-text-field v-model="name" label="Name"></v-text-field>
    <v-text-field v-model="address" label="Address"></v-text-field>
    <v-text-field v-model="description" label="Description"></v-text-field>
    <v-btn color="primary" @click="save">Save </v-btn>
  </v-card>
</template>

<script>
import api from "@/services/api";
export default {
  name: "NewBranchSetup",
  emits: ["continue"],
  data() {
    return {
      name: "",
      address: "",
      description: "",
      // branch_setup_complete: false,
    };
  },

  methods: {
    save() {
      const { name, address, description } = this;
      //store branches to database
      api
        .post(`organizations/`, { name, address, description })
        .then(() => {
          this.$emit("continue");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
