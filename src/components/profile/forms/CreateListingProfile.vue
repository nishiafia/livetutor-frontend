<template>
  <v-card class="pa-4">
    <v-app-bar outlined>
      <v-app-bar-title>Manage Your Teacher Listing Details</v-app-bar-title>
    </v-app-bar>
    <v-radio-group v-model="type" label="Listing Type" row>
      <v-radio label="Individual" value="individual"> </v-radio>
      <v-radio label="Organization" value="organization"> </v-radio>
    </v-radio-group>
    <v-text-field
      v-if="type == 'organization'"
      label="Organization Name"
    ></v-text-field>
    <v-textarea v-model="about" label="About"></v-textarea>
    <v-autocomplete
      label="Grades"
      multiple
      v-model="grades"
      :items="grades_list"
      item-text="title"
      item-value="id"
    ></v-autocomplete>
    <v-autocomplete
      label="Subjects"
      multiple
      v-model="subjects"
    ></v-autocomplete>
    <v-text-field label="Video Link" v-model="video_link"></v-text-field>
    <v-text-field label="Monthly Fee" v-model="price_monthly"></v-text-field>
    <v-text-field label="Course Fee" v-model="price_course"></v-text-field>
    <v-text-field label="Trial Time" v-model="trial_time">
      <template v-slot:append-outer>
        <v-select
          class="pa-0 ma-0"
          :items="['Minute', 'Hour']"
          v-model="trialTimeType"
        >
        </v-select>
      </template>
    </v-text-field>
    <v-radio-group v-model="availability" label="Availability">
      <v-radio
        v-for="(item, index) in availability_options"
        :value="item.value"
        :label="item.text"
        :key="index"
      ></v-radio>
    </v-radio-group>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit"> Submit </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      subjects: [],
      grades: [],
      price_monthly: "",
      price_course: "",
      trial_time: "",
      availability: "online",
      type: "individual",
      trialTimeType: "Minute",
      video_link: "",
      about: "",
      availability_options: [
        {
          text: "Online",
          value: "online",
        },
        {
          text: "Offline",
          value: "offline",
        },
        {
          text: "Both",
          value: "both",
        },
      ],
      grades_list: [],
    };
  },
  created() {
    console.log("hhh");
    this.loadGrades();
    this.getUserListingProfile();
  },
  methods: {
    getUserListingProfile() {
      this.$api.get(`/listing/self-listing/`).then((res) => {
        this.grades = res.data.grades;
        this.subjects = res.data.subjects;
        this.video_link = res.data.video_link;
        this.about = res.data.about;
        this.price_monthly = res.data.price_monthly;
        this.price_course = res.data.price_course;
        this.availability = res.data.availability;
        this.trial_time = res.data.trial_time;
      });
    },
    loadGrades() {
      this.$api.get("/grades/").then((res) => (this.grades_list = res.data));
    },
    submit() {
      this.$api
        .post("/listing/", {
          video_link: this.video_link,
          type: this.type,
          about: this.about,
          subjects: this.subjects,
          grades: this.grades,
          price_monthly: this.price_monthly,
          price_course: this.price_course,
          trial_time: this.trial_time,
          availability: this.availability,
          trialTimeType: this.trialTimeType,
        })
        .then((res) => console.log(res));
    },
  },
};
</script>

<style>
</style>
