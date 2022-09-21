import api from "../services/api";
export default {
  namespaced: true,
  state: {
    organization: {},
  },
  actions: {
    updateOrganizationDetails({ commit }, payload) {
      const formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }
      return new Promise((resolve, reject) => {
        api
          .patch(`users/${payload.id}/`, formData)
          .then((res) => {
            commit("loadOrganization", res.data);
            resolve(res.data);
          })
          .catch((err) => reject(err));
      });
    },
    loadOrganizationDetails({ commit }, organizationID) {
      return new Promise((resolve, reject) => {
        return api
          .get("users/me/")
          .then((res) => {
            commit("loadOrganization", res.data);
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
  mutations: {
    loadOrganization(state, payload) {
      state.organization = payload;
    },
  },
  getters: {
    getOrganizationDetails: (state) => state.organization,
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
