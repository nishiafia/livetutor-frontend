import api from "@/services/api";
export default {
  namespaced: true,
  state: {
    meetings: [],
  },
  actions: {
    get({ commit }) {
      // const colors = ['orange lighten-2']
      return api.get("/meetings/").then((response) =>
        commit(
          "load",
          response.data.map((meeting) => ({
            ...meeting,
            starts_at: new Date(meeting.start_date_time),
            ends_at: new Date(meeting.end_date_time),
          }))
        )
      );
    },

    add({ dispatch }, { meetings }) {
      return new Promise((resolve, reject) => {
        api
          .post("/meetings/", meetings)
          .then((response) => {
            dispatch("get").then(() => {
              resolve(response);
            });
          })
          .catch((error) => reject(error));
      });
    },
    update(
      { dispatch },
      { id, name, description, meeting_date, start_time, end_time }
    ) {
      return api
        .put("/meetings/", {
          id,
          name,
          description,
          meeting_date,
          start_time,
          end_time,
        })
        .then(() => dispatch("get"));
    },
    delete({ dispatch }, { id }) {
      return api.delete(`/meetings/${id}`).then(() => dispatch("get"));
    },
  },
  mutations: {
    load(state, payload) {
      state.meetings = payload;
    },
  },
  getters: {
    todays_upcoming_meetings: (state) =>
      state.meetings.filter(
        (meeting) =>
          new Date().getDate() ===
            new Date(meeting.start_date_time).getDate() &&
          new Date(meeting.start_date_time).getTime() >= new Date().getTime()
      ),
    meetings_for_current_class: (state) => (class_id, trial) =>
      state.meetings.filter(
        (meeting) => meeting.room === class_id && meeting.trial == trial
      ),
  },
};
