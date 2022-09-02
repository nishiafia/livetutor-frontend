import api from "../services/api";

export default {
  namespaced: true,
  state: {
    classes: [],
  },
  actions: {
    get({ commit }) {
      return api.get("/rooms/").then((response) => commit("load", response.data));
    },
    add({ dispatch }, { name, selected_categories }) {
      return api
        .post("/rooms/", {
          name,
          selected_categories,
        })
        .then(() => dispatch("get"));
    },
    update({ dispatch }, { id, name, categories }) {
      return api.put("/rooms/", { id, name, categories }).then(() => dispatch("get"));
    },
    delete({ dispatch }, { id }) {
      return api.delete(`/rooms/${id}`).then(() => dispatch("get"));
    },
  },
  mutations: {
    load(state, payload) {
      state.classes = payload;
    },
  },
  getters: {
    get_current_class_info: (state) => (class_id) =>
      state.classes.find((cls) => cls.id == class_id),
    get_user_owned_classes: (state) => state.classes.filter((cls) => cls.is_author === true),
    is_class_owner: (state) => (class_id) =>
      state.classes.find((cls) => cls.id == class_id).is_author,
    is_class_teacher: (state) => (class_id) =>
      state.classes.find((cls) => cls.id == class_id).is_teacher,
    is_class_owner_or_teacher: (state) => (class_id) => {
      const cls = state.classes.find((cls) => cls.id == class_id);
      return cls.is_teacher || cls.is_author;
    },
  },
};
