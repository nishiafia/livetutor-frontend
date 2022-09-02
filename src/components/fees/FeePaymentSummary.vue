<template>
  <v-card>
    <v-card-title>Room Fee Summary</v-card-title>
    <v-data-table :items="summary" :headers="headers">
      <template v-slot:item.January="{ item }">
        <span v-if="item.payments.January">
          {{ item.payments.January.paid }}</span
        >
      </template>
      <template v-slot:item.February="{ item }">
        <span v-if="item.payments.February">
          {{ item.payments.February.paid }}
        </span>
      </template>
      <template v-slot:item.March="{ item }">
        <span v-if="item.payments.March"> {{ item.payments.March.paid }}</span>
      </template>
      <template v-slot:item.April="{ item }">
        <span v-if="item.payments.April"> {{ item.payments.April.paid }}</span>
      </template>
      <template v-slot:item.May="{ item }">
        <span v-if="item.payments.May"> {{ item.payments.May.paid }} </span>
      </template>
      <!-- <template v-slot:item.April="{ item }">
        <v-chip
          v-if="
            item.payments.April &&
            item.payments.April.paid === item.payments.April.total
          "
          color="green"
          dark
          style="border-radius: 0"
          >{{ item.payments.April.total }}</v-chip
        >
      </template> -->
      <!-- <template v-slot:item.May="{ item }">
        <v-progress-linear
          height="25"
          width="100px "
          :buffer-value="item.payments.May.total"
          dark
          color="amber"
          :value="item.payments.May.paid"
        >
          <strong>{{ item.payments.May.total }}</strong></v-progress-linear
        >
      </template> -->
      <template v-slot:item.June="{ item }">
        <span v-if="item.payments.June"> {{ item.payments.June.paid }}</span>
      </template>
      <template v-slot:item.July="{ item }">
        <span v-if="item.payments.July">
          {{ item.payments.July.paid }} / {{ item.payments.July.total }}</span
        >
      </template>
      <template v-slot:item.August="{ item }">
        <span v-if="item.payments.August">
          {{ item.payments.August.paid }}</span
        >
      </template>
      <template v-slot:item.September="{ item }">
        <span v-if="item.payments.September">
          {{ item.payments.September.paid }}</span
        >
      </template>
      <template v-slot:item.October="{ item }">
        <span v-if="item.payments.October">
          {{ item.payments.October.paid }} / {{ item.payments.October.total }}
        </span>
      </template>
      <template v-slot:item.November="{ item }">
        <v-tooltip></v-tooltip>
        <span v-if="item.payments.November">
          {{ item.payments.November.paid }} / {{ item.payments.November.total }}
        </span>
      </template>

      <template v-slot:item.December="{ item }">
        <span v-if="item.payments.December">
          {{ item.payments.December.paid }}/{{ item.payments.December.total }}
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      payments: [],
      headers: [
        {
          text: "User",
          value: "user",
        },
        {
          text: "January",
          value: "January",
        },
        {
          text: "February",
          value: "February",
        },
        {
          text: "March",
          value: "March",
        },
        {
          text: "April",
          value: "April",
        },
        {
          text: "May",
          value: "May",
        },
        {
          text: "June",
          value: "June",
        },
        {
          text: "July",
          value: "July",
        },
        {
          text: "August",
          value: "August",
        },
        {
          text: "September",
          value: "September",
        },
        {
          text: "October",
          value: "October",
        },
        {
          text: "November",
          value: "November",
        },
        {
          text: "December",
          value: "December",
        },
        // {
        //   text: "Total",
        //   value: "total",
        // },
        {
          text: "Action",
          value: "action",
        },
      ],
    };
  },
  mounted() {
    this.loadFeeSummary();
  },
  methods: {
    loadFeeSummary() {
      this.$api
        .get(`/rooms/${this.$route.params.id}/payment-summary/`)
        .then((response) => {
          this.payments = response.data;
        });
    },
  },
  computed: {
    summary() {
      const summary = this.payments.map((r) => ({
        user: r.id,
        payments: r.room_user_fees.reduce((acc, fee) => {
          if (!acc[fee.month]) {
            acc[fee.month] = {
              paid: 0,
              total: 0,
            };
          }
          if (fee.room_fee_payment !== null) {
            acc[fee.month].paid += fee.payment_amount;
          }
          acc[fee.month].total += fee.amount;
          return acc;
        }, {}),
      }));
      return summary;
    },
  },
};
</script>

<style></style>
