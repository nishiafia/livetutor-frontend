<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-actions>
            <v-btn @click="deleteNote">Delete</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="updateNote(note)">Save</v-btn>
          </v-card-actions>
          <v-row>
            <v-col cols="4">
              <v-text-field label="Title" v-model="note.name"></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Description"
                v-model="note.description"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-card> </v-card>
          <v-row class="fill-height" align="center" justify="center">
            <v-col :key="i" cols="4" v-for="(file, i) in note.note_files">
              <v-hover v-slot="{ hover }">
                <v-card
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <v-img :src="file.file_url" height="225px">
                    <v-card-title class="text-h6 white--text">
                      <v-row
                        class="fill-height flex-column"
                        justify="space-between"
                      >
                        <div class="align-self-center">
                          <v-btn
                            :color="transparent"
                            :class="{ 'show-btns': hover }"
                            icon
                            @click="deleteFile(file)"
                          >
                            <v-icon> mdi-delete </v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="6"
        ><v-card class="pa-4">
          <v-card-title>
            <span class="headline">
              <v-icon>mdi-file-image-outline</v-icon>
              <span>Files</span>
            </span></v-card-title
          >
          <v-row justify="center">
            <v-col cols="4" v-for="(item, i) in note.files" :key="i">
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

          <v-file-input
            multiple
            chips
            v-model="newFiles"
            append-icon="mdi-check"
            label="Add New Files"
            @click:append="addFiles"
          ></v-file-input> </v-card
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
import Thumbnail from "../components/global/Thumbnail.vue";
export default {
  components: { Thumbnail },
  name: "notes",

  data: () => ({
    menu: false,
    menu2: false,
    newFiles: [],
    transparent: "rgba(255, 255, 255, 0)",
  }),

  methods: {
    deleteFile({ id, note_id }) {
      return api.delete(`note_files/${id}`);
    },
    deleteNote() {
      return this.$store.dispatch("notes/delete", this.note.id);
    },
    addFiles() {
      let formData = new FormData();
      formData.append("id", this.note.id);
      if (this.newFiles.length > 0) {
        for (let i = 0; i < this.newFiles.length; i++) {
          formData.append("attachments[]", this.newFiles[i]);
        }
      }

      console.log(formData);
      return api
        .post("note_files/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res));
    },
    updateNote({ id, class_id, name, description }) {
      return this.$store.dispatch("notes/update", {
        id,
        class_id,
        name,
        description,
      });
    },
  },

  computed: {
    note() {
      return this.$store.state.notes.notes.find(
        (note) => note.id == this.$route.params.id
      );
    },
  },

  // computed: {
  //   submissions() {
  //     // return this.$store.state.notes.submissions;
  //     return this.$store.getters["notes/get_submission_by_note"](
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
