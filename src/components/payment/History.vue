<template>
  <v-card>
    <v-card-text>Payment History</v-card-text>
    <v-data-table :headers="headers" :items="$store.state.payment.payment_history">
      <template v-slot:item.created_at="{ item }">
        {{ new Date(item.created_at).toLocaleString() }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Date", value: "created_at" },
        { text: "Amount", value: "amount" },
      ],
    };
  },
  created() {
    this.$store.dispatch("payment/fetchPaymentHistory");
  },
};
</script>

<style></style>
