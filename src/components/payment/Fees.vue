<template>
  <v-card class="pa-2">
    <v-card-title> Due Payments </v-card-title>
    <v-data-table
      show-select
      :items="month_fees"
      :headers="headers"
      v-model="$store.state.payment.selected_fees"
    >
      <template v-slot:action="{ item }">
        <v-btn icon><v-icon>mdi-eye</v-icon></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["fees"],

  data() {
    return {
      headers: [
        // { text: "Title", value: "fee.name" },
        { text: "Amount", value: "total" },
        { text: "Month", value: "month" },
        { text: "Year", value: "year" },
        { text: "Action", value: "action" },
      ],
    };
  },
  computed: {
    month_fees: function () {
      const result = this.fees.reduce(function (res, value) {
        if (!res[`${value.month}-${value.year}`]) {
          res[`${value.month}-${value.year}`] = {
            month: value.month,
            total: 0,
            year: value.year,
            room_user_fee_ids: [],
          };
          res.push(res[`${value.month}-${value.year}`]);
        }
        res[`${value.month}-${value.year}`].total += value.amount;
        res[`${value.month}-${value.year}`].room_user_fee_ids.push(value.id);

        return res;
      }, []);
      var id = -1;
      return result.map((value) =>
        Object.assign(value, {
          id: ++id,
        })
      );
    },
  },
};
</script>

<style></style>
