<template>
  <v-card class="pa-0">
    <v-toolbar width="100%" class="mx-0" color="secondary " dark>
      <v-card-text class="text-h5">Add New Link</v-card-text>
      <v-spacer> </v-spacer>
      <v-btn icon @click="$emit('closeDialog')">
        <v-icon large color="red lighten-2">mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form v-on:submit.prevent="save" ref="form" class="pa-6">
      <v-text-field
        v-model="name"
        label="Title"
        :rules="$requiredRules"
      ></v-text-field>
      <v-text-field v-model="details" label="Short Description"></v-text-field>
      <v-text-field
        v-model="link"
        :rules="link_rules"
        label="Link URI"
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn color="blue darken-1" text @click="$emit('closeDialog')">
          Close
        </v-btn> -->
        <v-btn color="secondary" type="submit"> Save </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
function initialState() {
  return {
    form: "",
    name: "",
    details: "",
    link: "",
    selected_class: {},
    link_rules: [
      (v) => !!v || "Link is required",
      (v) =>
        v.startsWith("http") ||
        v.startsWith("https") ||
        "Link must start with http or https",
    ],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  };
}
export default {
  props: ["class_id"],
  data: function () {
    return {
      form: "",
      name: "",
      details: "",
      link_rules: [
        (v) => !!v || "Link is required",
        (v) =>
          v.startsWith("http://") ||
          v.startsWith("https://") ||
          "Link must start with http:// or https://",
      ],
      link: "",
      classes: this.$store.state.classes.classes,
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
    };
  },
  emits: ["closeDialog"],
  // props: ["selectedDate"],

  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("assignments/add", {
            name: this.name,
            description: this.details,
            attachments: this.attachments,
            room: this.class_id ? this.class_id : this.selected_class.id,
            submission_date_time: `${this.due_date} ${this.due_time}`,
            mark: this.mark,
          })
          .then(() => {
            Object.assign(this.$data, initialState());
            alert("Success");
            this.$emit("closeDialog");
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
    getSelectText(item) {
      return item.section;
    },
  },
  computed: {
    today() {
      return new Date(new Date() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
  },
};
</script>
<style></style>
