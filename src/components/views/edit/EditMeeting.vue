<template>
  <v-card>
    <v-text-field v-model="item.name"> </v-text-field>
    <v-text-field v-model="item.description"> </v-text-field>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="item.meeting_date"
      transition="scale-transition"
      offset-y
      min-width="auto"
      :retain-focus="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="item.meeting_date"
          label="Picker in menu"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="item.meeting_date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(item.meeting_date)">
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>

    <v-menu
      ref="menu2"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="item.start_time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="item.start_time"
          label="Picker in menu"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu2"
        v-model="item.start_time"
        full-width
        @click:minute="$refs.menu2.save(item.start_time)"
      ></v-time-picker>
    </v-menu>

    <v-menu
      ref="menu3"
      v-model="menu3"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="item.end_time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="item.end_time"
          label="Picker in menu"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu3"
        v-model="item.end_time"
        full-width
        @click:minute="$refs.menu3.save(item.end_time)"
      ></v-time-picker>
    </v-menu>
    <!-- <v-time-picker v-model="item.ends_at"> </v-time-picker> -->
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return { menu: false, menu2: false, menu3: false };
  },
};
</script>

<style>
</style>
