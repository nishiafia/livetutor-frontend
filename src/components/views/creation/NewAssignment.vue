<template>
  <v-card class="pa-0">
    <v-toolbar width="100%" class="mx-0" color="secondary " dark>
      <v-card-text class="text-h5">Create New Assignment</v-card-text>
      <v-spacer> </v-spacer>
      <v-btn icon @click="$emit('closeDialog')">
        <v-icon large color="red lighten-2">mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form v-on:submit.prevent="save" ref="form" class="pa-6">
      <v-text-field
        v-model="name"
        label="Title"
        hide-details="auto"
        :rules="$requiredRules"
      ></v-text-field>
      <v-text-field v-model="details" label="Short Description"></v-text-field>

      <v-text-field
        type="number"
        v-model="mark"
        label="Mark"
        :rules="$requiredRules"
      ></v-text-field>

      <v-file-input
        label="Attachments"
        v-model="attachments"
        prepend-icon=""
        prepend-inner-icon="mdi-attachment"
        accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
        chips
        show-size
        multiple
        counter
      ></v-file-input>

      <v-row>
        <v-col>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="due_date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="due_date"
                label="Assignment Due Date"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="$requiredRules"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due_date" :min="today" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(due_date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="due_time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="due_time"
                label="Assignment Due Time"
                prepend-inner-icon="mdi-clock-time-four-outline"
                :rules="$requiredRules"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              ampm-in-title
              format="ampm"
              v-model="due_time"
              full-width
              @click:minute="$refs.menu2.save(due_time)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>

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
    due_date: null,
    start: null,
    due_time: null,
    menu: false,
    menu2: false,
    mark: 0,
    selected_class: {},
    attachments: {},
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
      due_date: null,
      start: null,
      due_time: null,
      menu: false,
      menu2: false,
      selected_class: {},
      attachments: {},
      mark: 0,
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
