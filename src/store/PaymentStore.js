export default {
  namespaced: true,
  state: {
    selected_fees: [],
    payment_history: [],
  },
  actions: {
    pay({ state, getters, dispatch }) {
      const room_user_fees = [];
      state.selected_fees.forEach((selected_fee) =>
        selected_fee.room_user_fee_ids.forEach((room_user_fee_id) =>
          room_user_fees.push(room_user_fee_id)
        )
      );
      return this._vm.$api
        .post("payments/", {
          room_user_fee: room_user_fees,
          amount: getters.total_amount,
        })
        .then(() => dispatch("fetchPaymentHistory"));
    },
    fetchPaymentHistory({ commit }) {
      return this._vm.$api.get("payments/").then((response) => {
        commit("setPaymentHistory", response.data);
      });
    },
  },
  mutations: {
    setPaymentHistory(state, payment_history) {
      state.payment_history = payment_history;
    },
  },
  getters: {
    total_amount: (state) => {
      return state.selected_fees.reduce((total, fee) => {
        return Number(total) + Number(fee.total);
      }, 0);
    },
  },
};
