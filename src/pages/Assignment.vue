<template>
  <v-container class="pa-2">
    <v-row
      ><v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-actions>
            <v-btn @click="deleteAssignment" color="red lighten-2" dark outlined
              >Delete</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              @click="updateAssignment(assignment)"
              color="green lighten-2"
              dark
              outlined
              >Save</v-btn
            >
          </v-card-actions>
          <v-row>
            <v-col cols="8">
              <v-text-field
                label="Title"
                v-model="assignment.name"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Mark"
                type="number"
                v-model="assignment.mark"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            label="Description"
            v-model="assignment.description"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="assignment.end_date_time"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="assignment.end_date_time"
                    label="Assignment Due Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="assignment.end_date_time"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(assignment.end_date_time)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :nudge-right="40"
                :return-value.sync="assignment.due_time"
                transition="scale-transition"
                offset-y
                :close-on-content-click="false"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="assignment.end_date_time"
                    label="Assignment Due Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="assignment.end_date_time"
                  full-width
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu2.save(assignment.due_time)"
                  >
                    OK
                  </v-btn></v-time-picker
                >
              </v-menu>
            </v-col>
          </v-row>
        </v-card> </v-col
      ><v-col cols="12" md="6"
        ><v-card class="pa-4">
          <v-card-title>
            <span class="headline">
              <v-icon>mdi-file-image-outline</v-icon>
              <span>Files</span>
            </span></v-card-title
          >
          <v-row class="fill-height" align="center" justify="center">
            <v-col
              v-for="(item, i) in assignment.files"
              :key="i"
              cols="12"
              md="3"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <thumbnail :file="item.file"></thumbnail>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
          <v-row>
            <v-file-input
              multiple
              chips
              v-model="newFiles"
              append-icon="mdi-check"
              label="Add New Files"
              @click:append="addFiles"
            ></v-file-input>
          </v-row> </v-card></v-col
    ></v-row>

    <v-card class="mt-4">
      <v-card-title>Submissions</v-card-title>
      <v-data-table
        dense
        :headers="headers"
        :items="submissions"
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:item.mark="{ item }">
          <v-text-field
            v-model="item.mark"
            type="number"
            @change="updateMark($event, item)"
            :max="assignment.mark"
            step="0.1"
            :suffix="`/ ${assignment.mark}`"
          >
          </v-text-field>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
import Thumbnail from "../components/global/Thumbnail.vue";
export default {
  components: { Thumbnail },
  name: "Assignments",

  data: () => ({
    menu: false,
    menu2: false,
    newFiles: [],
    transparent: "rgba(255, 255, 255, 0)",
    headers: [
      {
        text: "Submitted By",
        value: "room_user.name",
      },
      {
        text: "Submitted At",
        value: "created_at",
      },
      {
        text: "Submission Status",
        value: "submit_status",
      },
      { text: "Mark", value: "mark" },
      {
        text: "File",
        value: "files",
      },
    ],
    submissions: [],
  }),
  created() {
    this.loadSubmissions();
  },
  methods: {
    loadSubmissions() {
      api
        .get(`/assignments/${this.$route.params.id}/submissions/`)
        .then((res) => {
          this.submissions = res.data;
        });
    },
    updateMark(event, { id }) {
      this.$api
        .put(`assignments/${this.$route.params.id}/submissions/update-mark/`, {
          mark: event,
          assignment_submission_id: id,
        })
        .then((r) => console.log(r));
    },
    deleteFile({ id, assignment_id }) {
      return api.delete(`assignment_files/${id}`);
    },
    deleteAssignment() {
      return this.$store.dispatch("assignments/delete", this.assignment.id);
    },
    addFiles() {
      const formData = new FormData();
      const assignment_id = this.assignment.id;
      formData.append("assignment_id", assignment_id);
      if (this.newFiles.length > 0) {
        for (let i = 0; i < this.newFiles.length; i++) {
          formData.append("attachments[]", this.newFiles[i]);
        }
      }
      return api
        .post(`assignments/${assignment_id}/files/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res));
    },
    updateAssignment({
      id,
      class_id,
      name,
      description,
      due_date,
      due_time,
      mark,
    }) {
      return this.$store.dispatch("assignments/update", {
        id,
        class_id,
        name,
        description,
        end_date_time,
        mark,
      });
    },
  },

  computed: {
    assignment() {
      return this.$store.state.assignments.assignments.find(
        (assignment) => assignment.id == this.$route.params.id
      );
    },
  },

  // computed: {
  //   submissions() {
  //     // return this.$store.state.assignments.submissions;
  //     return this.$store.getters["assignments/get_submission_by_assignment"](
  //       this.$route.params.id
  //     );
  //   },
  // },
};
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 1;
}
.show-btns {
  color: rgb(197, 42, 42) !important;
}
</style>
