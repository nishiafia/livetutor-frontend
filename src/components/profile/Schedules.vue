<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar dark color="secondary" flat>
          <v-dialog v-model="dialog" persistent max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined dark class="mr-4" v-bind="attrs" v-on="on" text>
                <v-icon left>mdi-plus</v-icon>
                New Schedule
              </v-btn>
            </template>
            <NewMeeting
              v-bind:class_id="class_id"
              @closeDialog="closeDialog"
            ></NewMeeting>
          </v-dialog>

          <v-btn text outlined class="mr-4" @click="setToday" dark>
            Today
          </v-btn>
          <v-btn dark fab text small @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>

          <v-btn fab text small dark @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined dark v-bind="attrs" v-on="on" text>
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="green lighten-3"
          :events="meetings"
          event-start="starts_at"
          event-end="ends_at"
          event-color="accent"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>

        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" width="350px" flat>
            <v-toolbar color="accent" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>

              <v-btn
                icon
                :to="{
                  name: 'meeting',
                  params: {
                    roomName: selectedEvent.lobby_name,
                    // jwt: meetingjwt,
                  },
                }"
              >
                <v-icon>mdi-arrow-top-right</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.description"></span>
            </v-card-text>

            <v-card-text v-if="selectedEvent.trial">
              <span v-html="'Trial Meeting'"></span>
            </v-card-text>
            <v-row>
              <v-col>
                <v-card-text
                  v-html="selectedEvent.starts_at"
                ></v-card-text> </v-col
              ><v-col>
                <v-card-text v-html="selectedEvent.ends_at"></v-card-text>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import jwtmaker from "../../services/jwtmaker";
import NewMeeting from "../views/creation/NewMeeting.vue";
export default {
  components: { NewMeeting },
  props: ["class_id"],
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: "",
    selectedOpen: false,
    selectedDate: null,
    events: [],
    dialog: false,
    class: {},
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  created() {
    this.$store.dispatch("meetings/get");
    this.class = this.$store.getters["classes/get_current_class_info"](
      this.class_id
    );
    console.log(
      this.$store.getters["classes/is_class_owner_or_teacher"](
        "53ddcf2512b04c01b9c78b4561a47c8e"
      )
    );
  },
  computed: {
    affiliation() {
      if (Object.entries(this.selectedEvent).length > 0) {
        return this.$store.getters["classes/is_class_owner_or_teacher"](
          this.selectedEvent.room
        )
          ? "owner"
          : "member";
      }
      return "";
    },
    meetingjwt() {
      return jwtmaker({
        context: {
          user: {
            id: this.$store.getters["user/getUserId"],
            name: this.$store.getters["user/getName"],
            email: this.$store.getters["user/getEmail"],
            affiliation: this.affiliation,
          },
        },
        sub: "*",
        room: "*",
      });
    },

    meetings() {
      return this.class_id
        ? this.$store.getters["meetings/meetings_for_current_class"](
            this.class_id,
            this.class.trial
          )
        : this.$store.state.meetings.meetings;
    },
  },
  methods: {
    // print(event) {
    //   console.log(event.weekday);
    //   this.$store.commit("meetings/addClass", {
    //     name: "Chemistry",
    //     class_code: "12124123",
    //     start: event.date,
    //     end: event.date,
    //     color: "orange",
    //   });
    // },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    // getEventColor(event) {
    //   return event.color;
    // },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },

    showDialogWithCurrentDate(event) {
      this.selectedDate = event.date;
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
<style lang="scss">
$calendar-daily-day-font-size: "222px";
</style>
