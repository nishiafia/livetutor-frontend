<template>
  <v-card>
    <v-toolbar width="100%" class="mx-0" color="secondary " dark>
      <v-card-text class="text-h5">Add New Exam</v-card-text>
      <v-spacer> </v-spacer>
      <v-btn icon @click="$emit('closeDialog')">
        <v-icon large color="red lighten-2">mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form v-on:submit.prevent="save" ref="form" class="pa-6">
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            label="Title"
            hide-details="auto"
            :rules="$requiredRules"
          ></v-text-field>
        </v-col>
        <!--
        <v-col>
          <v-select
            v-if="!class_id"
            v-model="selected_class"
            label="Select Class"
            :items="user_created_classes"
            item-text="name"
            item-value="id"
            persistent-hint
            return-object
            :rules="$requiredRules"
          >
          </v-select>
        </v-col> -->
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="details"
            label="Short Description"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :rules="$requiredRules"
            v-model="mark"
            type="number"
            label="Mark"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-file-input
            label="Attachments"
            v-model="attachments"
            accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
            chips
            show-size
            multiple
            prepend-inner-icon="mdi-attachment"
            prepend-icon=""
            counter
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-menu
            ref="menu"
            v-model="menu"
            :rules="$requiredRules"
            :close-on-content-click="false"
            :return-value.sync="exam_date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="exam_date"
                :rules="$requiredRules"
                label="Exam Date"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="exam_date" :min="today" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(exam_date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu></v-col
        >
      </v-row>
      <v-row>
        <v-col>
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="start_time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="start_time"
                :rules="$requiredRules"
                label="Start Time"
                prepend-inner-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              ampm-in-title
              :rules="$requiredRules"
              format="ampm"
              color="red lighten-1"
              v-model="start_time"
              @click:minute="$refs.menu2.save(start_time)"
            ></v-time-picker>
          </v-menu>
        </v-col>

        <v-col>
          <v-menu
            ref="menu3"
            v-model="menu3"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="end_time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="end_time"
                :rules="$requiredRules"
                label="Submission Time"
                prepend-inner-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu3"
              ampm-in-title
              format="ampm"
              color="red lighten-1"
              v-model="end_time"
              @click:minute="$refs.menu3.save(end_time)"
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
import { mapGetters } from "vuex";
function initialState() {
  return {
    form: "",
    name: "",
    details: "",
    exam_date: null,
    start_time: null,
    end_time: null,
    mark: "",
    menu: false,
    menu2: false,
    menu3: false,
    selected_class: {},
    attachments: {},
    // classes: this.$store.state.classes.classes,
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
      exam_date: null,
      start_time: null,
      end_time: null,
      mark: "",
      menu: false,
      menu2: false,
      menu3: false,
      selected_class: {},
      attachments: {},
      // classes: this.$store.state.classes.classes,
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
        this.$store.dispatch("exams/add", {
          name: this.name,
          description: this.details,
          room: this.class_id ? this.class_id : this.selected_class.id,
          attachments: this.attachments,
          start_date_time: `${this.exam_date} ${this.start_time}`,
          end_date_time: `${this.exam_date} ${this.end_time}`,
          mark: this.mark,
        });
        Object.assign(this.$data, initialState());
        this.$emit("closeDialog");
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
    ...mapGetters({ user_created_classes: "classes/get_user_owned_classes" }),
  },
};
</script>
<style></style>
