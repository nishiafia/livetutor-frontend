<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-actions>
            <v-btn @click="deleteExam">Delete</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="updateExam(exam)">Save</v-btn>
          </v-card-actions>
          <v-text-field label="Title" v-model="exam.name"></v-text-field>
          <v-text-field
            label="Description"
            v-model="exam.description"
          ></v-text-field>
          <v-text-field label="Mark" v-model="exam.mark"></v-text-field>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="exam.exam_date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="exam.exam_date"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="exam.exam_date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(exam.exam_date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menu3"
            v-model="menu3"
            :nudge-right="40"
            :return-value.sync="exam.start_time"
            transition="scale-transition"
            offset-y
            :close-on-content-click="false"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="exam.start_time"
                label="Exam Start Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="menu3" v-model="exam.start_time" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu2.save(exam.start_time)"
              >
                OK
              </v-btn></v-time-picker
            >
          </v-menu>
          <v-menu
            ref="menu2"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="exam.end_time"
            transition="scale-transition"
            offset-y
            :close-on-content-click="false"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="exam.end_time"
                label="Exam End Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="menu2" v-model="exam.end_time" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu2.save(exam.end_time)"
              >
                OK
              </v-btn></v-time-picker
            >
          </v-menu>
        </v-card></v-col
      >
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">
              <v-icon>mdi-file-image-outline</v-icon>
              <span>Files</span>
            </span></v-card-title
          >
          <v-row class="fill-height" align="center" justify="center">
            <v-col v-for="(item, i) in exam.files" :key="i" cols="4">
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
          <v-card-actions>
            <v-file-input multiple chips v-model="newFiles"></v-file-input>
            <v-btn color="primary" class="ma-2" @click="addFiles" outlined
              >Add</v-btn
            ></v-card-actions
          >
        </v-card></v-col
      >
    </v-row>
    <v-row> </v-row>

    <v-card class="mt-4">
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
            :max="exam.mark"
            step="0.1"
            @change="updateMark($event, item)"
            :suffix="`/${exam.mark}`"
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
  name: "Exam",

  data: () => ({
    menu: false,
    menu2: false,
    menu3: false,
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
    api
      .get(
        `exams/${this.$route.params.id}/submissions/`
        // params: { id: this.$route.params.id },
      )
      .then(
        (r) =>
          (this.submissions = r.data.map((submission) => ({
            ...submission,
            created_at: new Date(submission.created_at).toLocaleString(),
          })))
      );
  },
  methods: {
    updateMark(event, { id }) {
      this.$api
        .put(`exams/${this.$route.params.id}/submissions/update-mark/`, {
          mark: event,
          exam_submission_id: id,
        })
        .then((r) => console.log(r));
    },
    deleteFile({ id, exam_id }) {
      return api.delete(`exam_files/${id}`);
    },
    deleteExam() {
      return this.$store.dispatch("exams/delete", this.exam.id);
    },
    addFiles() {
      let formData = new FormData();
      formData.append("id", this.exam.id);
      if (this.newFiles.length > 0) {
        for (let i = 0; i < this.newFiles.length; i++) {
          formData.append("attachments[]", this.newFiles[i]);
        }
      }

      return api
        .post("exam_files/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res));
    },
    updateExam({
      id,
      class_id,
      name,
      description,
      exam_date,
      start_time,
      end_time,
      mark,
    }) {
      return this.$store.dispatch("exams/update", {
        id,
        class_id,
        name,
        description,
        exam_date,
        start_time,
        end_time,
        mark,
      });
    },
  },

  computed: {
    exam() {
      return this.$store.state.exams.exams.find(
        (exam) => exam.id == this.$route.params.id
      );
    },
  },

  // computed: {
  //   submissions() {
  //     // return this.$store.state.exams.submissions;
  //     return this.$store.getters["exams/get_submission_by_exam"](
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
