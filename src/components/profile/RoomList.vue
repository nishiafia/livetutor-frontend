<template>
  <v-card color="grey lighten-4" class="mt-4" min-height="100">
    <v-toolbar width="100%" dark color="third">
      <v-toolbar-title>My Rooms</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog_join_class" persistent width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined v-bind="attrs" v-on="on" class="pa-2 mr-2"
            >Join Room</v-btn
          >
        </template>
        <JoinRoom @closeDialog="join_class_close_dialog"> </JoinRoom>
      </v-dialog>
      <v-dialog v-model="dialog_new_class" persistent width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined v-bind="attrs" v-on="on" class="pa-2"
            >New Room
          </v-btn>
        </template>
        <NewRoom @closeDialog="new_class_close_dialog"> </NewRoom>
      </v-dialog>
    </v-toolbar>

    <v-row class="pa-2">
      <v-col v-for="cls in classes" v-bind:key="cls.id" cols="6" lg="3">
        <v-card
          class="pa-2"
          width="100%"
          elevation="3"
          outlined
          height="150"
          :to="{ name: 'room', params: { id: cls.id } }"
        >
          <v-card-title
            >{{ cls.name }}

            <v-chip class="mx-1" small color="#33cc33" dark v-if="cls.is_author"
              >Owner</v-chip
            >
            <v-chip
              class="mx-1"
              small
              color="#ff6666"
              dark
              v-if="cls.is_teacher"
              >Teacher</v-chip
            >
            <v-chip
              v-if="cls.organization"
              small
              color="#BFC900"
              dark
              class="mx-1"
              ><span v-if="cls.organization">{{ cls.organization }} </span>
              <span v-if="cls.branch">|| {{ cls.branch }}</span></v-chip
            >
            <v-chip
              class="mx-1"
              small
              color="orange lighten-2"
              dark
              v-if="cls.trial"
              >Trial Room</v-chip
            >
          </v-card-title>
          <v-card-subtitle
            >{{ cls.code }}
            <v-btn icon v-on:click.prevent="copyText(cls.code)">
              <v-icon small> mdi-content-copy </v-icon>
            </v-btn></v-card-subtitle
          >
          <v-card-text v-if="cls.categories.length">
            Category:
            <v-chip
              class="mx-1"
              v-for="(category, index) in cls.categories"
              :key="index"
              >{{ category }}</v-chip
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col v-if="classes.length === 0" align-self="center">
        <v-card-text class="text-center text-h7">No Room Found</v-card-text>
      </v-col>
    </v-row>
    <v-snackbar v-model="showCopied" timeout="1000">Copied</v-snackbar>
  </v-card>
</template>

<script>
import NewRoom from "../views/creation/NewRoom.vue";
import JoinRoom from "../views/general/JoinRoom.vue";
export default {
  components: { NewRoom, JoinRoom },
  data() {
    return {
      showCopied: false,
      dialog_new_class: false,
      dialog_join_class: false,
    };
  },
  computed: {
    classes() {
      return this.$store.state.classes.classes;
    },
  },
  // created() {
  //   this.$store.dispatch("classes/get");
  // },
  methods: {
    new_class_close_dialog() {
      this.dialog_new_class = false;
    },
    join_class_close_dialog() {
      this.dialog_join_class = false;
    },
    copyText(class_code) {
      if (class_code !== undefined) {
        navigator.clipboard.writeText(class_code);
        this.showCopied = true;
      }
    },
  },
};
</script>

<style></style>
