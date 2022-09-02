import api from "@/services/api";

export default {
  namespaced: true,
  state: {
    exams: [],
  },
  actions: {
    get({ commit }) {
      return api.get("/exams/").then((response) =>
        commit(
          "load",
          response.data.map((data) => ({
            ...data,
            created_at: new Date(data.created_at).toLocaleString(),
            starts_at: new Date(data.starts_at).toLocaleString(),
            ends_at: new Date(data.ends_at).toLocaleString(),
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

      api
        .post("exams/", formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then(() => dispatch("get"));
    },
    update({ dispatch }, { id, name, description, exam_date, start_time, end_time, mark }) {
      return api
        .put("exams/", {
          id,
          name,
          description,
          exam_date,
          start_time,
          end_time,
          mark,
        })
        .then(() => dispatch("get"));
    },
    delete({ dispatch }, id) {
      return api.delete(`exams/${id}/`).then(() => dispatch("get"));
    },
    submit({ commit }, payload) {
      const { exam_id, exam_submission_files } = payload;
      let formData = new FormData();
      formData.append("exam_id", exam_id);

      for (let i = 0; i < payload.exam_submission_files.length; i++) {
        formData.append("exam_submission_files[]", exam_submission_files[i]);
      }
      return api
        .post(`exams/${exam_id}/submissions/`, formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then((res) => console.log(res));
    },
    getComments({ commit, getters }, payload) {

      return api.get(`exams/${payload.id}/comments/`).then(
        (response) => {
          commit("loadComments", { id: payload.id, comments: response.data });

        }
      ).catch((err) => console.log(err));

    }
  },
  mutations: {
    load(state, payload) {
      state.exams = payload;
    },
    loadComments(state, payload) {
      state.exams.find((exam) => exam.id === payload.id).comments = payload.comments;
    }
  },
  getters: {
    all_exam: (state) => state.exams,
    exams_for_current_class: (state) => (class_id) =>
      state.exams.filter((exam) => exam.room === class_id),
  },
};
