<template>
  <v-card>
    <v-toolbar dark color="secondary" flat>
      <v-toolbar-title>Upcoming Meetings</v-toolbar-title>
    </v-toolbar>
    <v-timeline dense v-if="todays_upcoming_meetings.length">
      <v-timeline-item
        right
        small
        v-for="(meeting, i) in todays_upcoming_meetings"
        color="green lighten-1"
        :key="i"
      >
        <v-row class="pt-1">
          <v-col cols="3">
            <v-row>
              {{
                new Date(meeting.start_date_time).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              }}
            </v-row>

            <v-row>
              {{
                new Date(meeting.end_date_time).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              }}
            </v-row>
          </v-col>
          <v-col>
            <v-row
              ><h3>{{ meeting.name }}</h3>
              <div class="text-caption">{{ meeting.room }}</div></v-row
            >
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
    <v-card-text class="text-center" v-else>No meeting today</v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return { meetings: [] };
  },

  computed: {
    ...mapGetters({
      todays_upcoming_meetings: "meetings/todays_upcoming_meetings",
    }),
  },
};
</script>

<style lang="scss"></style>
