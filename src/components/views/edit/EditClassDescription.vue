<template>
  <v-card>
    <v-card-title>Update Room Details</v-card-title>

    <!-- <v-card> -->
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="class_info.name" label="Title"></v-text-field>
          <v-combobox
            v-model="class_info.categories"
            label="Category"
            :items="categories.map((item) => item.title)"
            multiple
            chips
          ></v-combobox>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" @click="update(class_info)" text
        >Update</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/services/api";
export default {
  props: ["class_info"],

  data: function () {
    return {
      categories: [],
    };
  },
  created() {
    api.get("/categories").then((res) => (this.categories = res.data));
  },
  methods: {
    update(class_info) {
      this.$store.dispatch("classes/update", class_info);
    },
  },
};
</script>

<style>
</style>
