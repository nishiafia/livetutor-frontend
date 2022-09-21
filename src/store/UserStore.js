import axios from "axios";
import api from "../services/api";
export default {
  namespaced: true,
  state: {
    access: localStorage.getItem("access") || null,
    refresh: localStorage.getItem("refresh") || null,
    username: "",
    name: "",
    user_type: "",
    authenticated: false,
  },
  actions: {
    login({ commit, dispatch }, { phone, password }) {
      return new Promise((resolve, reject) => {
        return api
          .post("/token/", { phone: phone, password: password })
          .then((res) => {
            const { access, refresh } = res.data;
            commit("loadTokens", { access, refresh });
          })
          .then(() => dispatch("validate").then(() => resolve()))
          .catch((err) => reject(err));
      });
    },
    register({ commit, dispatch }, { phone, password }) {
      return new Promise((resolve, reject) =>
        api
          .post("/register/", { phone: phone, password: password })
          .then(() =>
            dispatch("login", { phone: phone, password: password }).then(() =>
              resolve()
            )
          )
          .catch((err) => {
            reject(err.data);
          })
      );
    },
    validate({ state, commit, dispatch }) {
      return api
        .post("users/verify/", null, {
          headers: { Authorization: `Bearer ${state.access}` },
        })
        .then((res) =>
          commit("loadUser", {
            username: res.data.username,
            name: res.data.name,
            user_type: res.data.user_type,
          })
        )
        .then(
          () =>
            (api.defaults.headers["Authorization"] = `Bearer ${state.access}`)
        )
        .then(() => {
          dispatch("assignments/get", null, { root: true });
          dispatch("exams/get", null, { root: true });
          dispatch("notes/get", null, { root: true });
          dispatch("classes/get", null, { root: true });
          dispatch("meetings/get", null, { root: true });
        })
        .catch(() => {
          return dispatch("logout");
        });
    },
    logout({ commit }) {
      commit("clear");
    },
  },
  mutations: {
    loadTokens(state, { access, refresh }) {
      state.access = access;
      state.refresh = refresh;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    },
    loadUser(state, { username, name, user_type }) {
      state.username = username;
      state.authenticated = true;
      state.name = name;
      state.user_type = user_type;
    },
    clear(state) {
      state.username = "";
      state.access = "";
      state.refresh = "";
      state.authenticated = false;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      api.defaults.headers["Authorization"] = "";
    },
  },
  getters: {
    getAccessToken: (state) => state.access,
    getRefreshToken: (state) => state.refresh,
    getUsername: (state) => state.username,
    userIsAuthenticated: (state) => state.authenticated,
    getUserId: (state) => state.id,
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getUserType: (state) => state.user_type,
    isOrganization: (state) => state.user_type === "ORGANIZATION",
    getOrganizationID: (state) =>
      state.user_type === "ORGANIZATION" ? state.id : null,
    isRegular: (state) => state.user_type === "REGULAR",
  },
};
