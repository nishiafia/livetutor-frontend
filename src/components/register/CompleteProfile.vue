<template>
  <v-container>
    <v-card-title>Lets Complete Your Profile</v-card-title>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Add Profile Picture
        </v-stepper-step>

        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">
          Add personal information</v-stepper-step
        ><v-divider></v-divider>
        <v-stepper-step step="3"> Create a Room </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-container>
            <v-row justify="center">
              <v-avatar class="profile" color="grey" size="164" rounded
                ><v-img :src="dp"></v-img>
              </v-avatar>
            </v-row>
          </v-container>

          <v-file-input
            accept=".jpg, .png"
            label="Add Profile Picture"
            v-model="dp"
            @change="loadImage"
          ></v-file-input>

          <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-container>
            <v-text-field label="Profession"></v-text-field>
            <v-autocomplete
              v-model="selected"
              :items="categories"
              item-text="name"
              chips
              label="Interests (i.e: Bangla, IELTS, HR)"
              full-width
              hide-details
              hide-no-data
              hide-selected
              multiple
              single-line
            ></v-autocomplete>
          </v-container>

          <v-btn text @click="e1 = 3"> Skip </v-btn>
          <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
        </v-stepper-content>
        <v-stepper-content step="3"
          ><new-room :from_complete="true" />
          <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-text-field
            label="Add Recepients email"
            hint="use (,) to separate emails"
          ></v-text-field>
        </v-stepper-content> </v-stepper-items
    ></v-stepper>
  </v-container>
</template>

<script>
import NewRoom from "../views/creation/NewRoom.vue";
import api from "@/services/api";
export default {
  components: { NewRoom },
  data() {
    return { e1: 1, dp: "", selected: "", categories: [] };
  },
  created() {
    api.get("/categories").then((res) => (this.categories = res.data));
  },
  methods: {
    loadImage(event) {
      this.dp = URL.createObjectURL(event);
      URL.revokeObjectURL(event);
    },
  },
};
</script>

<style>
</style>
