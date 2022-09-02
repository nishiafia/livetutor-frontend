import api from "@/services/api";

export default {
  namespaced: true,
  state: {
    notes: [],
  },

  //actions called in tab-notes
  actions: {
    get({ commit }) {
      return api.get("/notes/").then((response) =>
        commit(
          "load",
          response.data.map((data) => ({
            ...data,
            created_at: new Date(data.created_at).toLocaleString(),
          }))
        )
      );
    },
    add({ dispatch }, payload) {
      let formData = new FormData();
      for (var key in payload) {
        formData.append(key, payload[key]);
      }
      for (let i = 0; i < payload.attachments.length; i++) {
        formData.append("attachments[]", payload.attachments[i]);
      }

      return api
        .post("notes/", formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then(() => dispatch("get"));
    },

    update({ dispatch }, { id, name, description }) {
      return api
        .put("notes/", {
          id,
          name,
          description,
        })
        .then(() => dispatch("get"));
    },
    delete({ dispatch }, id) {
      return api.delete(`notes/${id}/`).then(() => dispatch("get"));
    },
    getComments({ commit, getters }, payload) {

      return api.get(`notes/${payload.id}/comments/`).then(
        (response) => {
          commit("loadComments", { id: payload.id, comments: response.data });

        }
      ).catch((err) => console.log(err));

    }
  },

  mutations: {
    load(state, payload) {
      state.notes = payload;
    },
    loadComments(state, payload) {
      state.notes.find((note) => note.id === payload.id).comments = payload.comments;
    }
  },
  getters: {
    all_note: (state) => state.notes,
    notes_for_current_class: (state) => (class_id) =>
      state.notes.filter((note) => note.room == class_id),
  },
};
