<template>
  <v-card>
    <v-card-title>
      <span
        class="text-h5"
        v-html="
          'Create New Schedule' +
          (this.class_id ? ' for ' + this.class_id : null)
        "
      ></span>
    </v-card-title>
    <v-card-subtitle>
      <span class="text-h7">Select single or multiple date</span>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            label="Title"
            hide-details="auto"
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
            persistent-hint
            :hint="`Room: ${
              selected_class.name || 'Not Selected'
            } | Category: ${selected_class.category || 'Not Selected'}`"
            return-object
          >
            <!-- <template v-slot:selection="{ item }"
              >{{ item.name }}
            </template> -->
            <!-- <template v-slot:item="{ item }"
              >{{ item.name }}
            </template> -->
          </v-select>
        </v-col>
        <v-row>
          <v-text-field
            v-model="details"
            label="Short Description"
          ></v-text-field>
        </v-row>
        <v-row>
          <strong>*You can select upto following 8 weeks</strong>
          <v-date-picker
            full-width
            v-model="dates"
            :max="four_weeks_from_today"
            :min="today"
            multiple
          ></v-date-picker>
        </v-row>
      </v-row>
      <v-row>
        <v-col>
          <h2>Start:</h2>
          <v-time-picker
            ampm-in-title
            format="ampm"
            color="green lighten-1"
            v-model="start"
            :max="end"
          ></v-time-picker>
        </v-col>
        <v-col>
          <h2>End:</h2>
          <v-time-picker
            ampm-in-title
            format="ampm"
            color="red lighten-1"
            v-model="end"
            :min="start"
          ></v-time-picker>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="!from_complete">
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('closeDialog')">
        Close
      </v-btn>
      <v-btn color="blue darken-1" @click="save" text> Save </v-btn>
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
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
function initialState() {
  return {
    name: "",
    category: "",
    details: "",
    dates: [],
    start: null,
    end: null,
    menu: false,
    selected_class: {},
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
  data: function () {
    return {
      name: "",
      details: "",
      dates: [],
      start: null,
      end: null,
      menu: false,
      selected_class: {},

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
  emits: ["closeDialog", "to_next_step"],
  methods: {
    save() {
      this.dates.map((date) =>
        this.$store.dispatch("meetings/add", {
          name: this.name,
          cateogry: this.category,
          description: this.details,
          dates: this.dates,
          class_id: this.class_id ? this.class_id : this.selected_class.id,
          starts_at: `${date} ${this.start}`,
          ends_at: `${date} ${this.end}`,
          // color: this.colors[(this.colors.length * Math.random()) | 0],
        })
      );
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
<style>
</style>
