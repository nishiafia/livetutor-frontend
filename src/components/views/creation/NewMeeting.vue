//TODO: meeting from first selected date
<template>
  <v-card class="pa-0">
    <v-toolbar width="100%" class="mx-0" color="secondary " dark>
      <v-card-text class="text-h5">Create New Meeting</v-card-text>
      <v-spacer> </v-spacer>
      <v-btn icon @click="$emit('closeDialog')">
        <v-icon large color="red lighten-2">mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form ref="form">
      <v-col class="pa-4">
        <v-row>
          <v-col>
            <v-text-field
              v-model="name"
              label="Title"
              hide-details="auto"
              :rules="$requiredRules"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-select
              v-if="!class_id"
              v-model="selected_class"
              label="Select Class"
              :items="user_created_classes"
              item-text="name"
              item-value="id"
              :rules="$requiredRules"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="details"
              label="Short Description"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-combobox
                  v-model="dates"
                  multiple
                  chips
                  small-chips
                  label="Select Date(s)"
                  hint="You can select upto 8 weeks"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  :rules="[(v) => v.length > 0 || 'Select at least one date']"
                  v-on="on"
                ></v-combobox>
              </template>
              <v-date-picker
                v-model="dates"
                :max="four_weeks_from_today"
                :min="today"
                multiple
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(dates)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="start"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="start"
                  label="Meeting Start Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="$requiredRules"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                ampm-in-title
                format="ampm"
                color="red lighten-1"
                v-model="start"
                :max="end"
                @click:minute="$refs.menu2.save(start)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="end"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="end"
                  label="Meeting End Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  :rules="$requiredRules"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu3"
                ampm-in-title
                format="ampm"
                color="red lighten-1"
                v-model="end"
                :min="start"
                @click:minute="$refs.menu3.save(end)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-card-actions v-if="!from_complete">
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue darken-1" text @click="$emit('closeDialog')">
            Close
          </v-btn> -->
          <v-btn color="primary" @click="save"> Save </v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="from_complete">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('skip_step')">
            Skip
          </v-btn>
          <v-btn color="blue darken-1" @click="save_for_completion" text>
            Continue
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-form>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

function initialState() {
  return {
    name: "",
    details: "",
    dates: [],
    start: null,
    end: null,
    menu: false,
    menu2: false,
    menu3: false,
    form: "",
    valid_form: "",
    selected_class: "",
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
  name: "NewMeeting",
  props: ["class_id", "from_complete"],
  emits: ["closeDialog", "to_next_step"],
  data: function () {
    return {
      name: "",
      details: "",
      form: "",
      valid_form: "",
      dates: [],
      start: null,
      end: null,
      menu: false,
      menu2: false,
      menu3: false,
      selected_class: "",
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

  methods: {
    save() {
      if (this.$refs.form.validate()) {
        const meetings = this.dates.map((date) => ({
          name: this.name,
          description: this.details,
          room: this.class_id ? this.class_id : this.selected_class,
          start_date_time: `${date} ${this.start}`,
          end_date_time: `${date} ${this.end}`,
        }));
        this.$store
          .dispatch("meetings/add", { meetings })
          .then(() => Object.assign(this.$data, initialState()))
          .then(() => this.$emit("closeDialog"));
      }
    },
    getSelectText(item) {
      return item.section;
    },
    save_for_completion() {
      this.save();
      this.$emit("to_next_step");
    },
  },
  computed: {
    four_weeks_from_today() {
      const date = new Date();
      date.setDate(date.getDate() + 84);
      return new Date(date - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },

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
