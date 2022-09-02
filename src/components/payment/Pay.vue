<template>
  <v-card outlined class="pa-4" min-width="100%">
    <!-- <v-checkbox
          multiple
          v-for="(selected_fee, index) in $store.state.payment.selected_fees"
          :label="selected_fee.fee.name"
          :value="selected_fee"
          v-model="$store.state.payment.selected_fees"
          :key="index"
        ></v-checkbox> -->
    <v-card-text class="text-h5 text-center"
      >You are selecting to pay:
      <strong>{{ this.$store.getters["payment/total_amount"] }} Taka</strong></v-card-text
    >
    <v-card-actions
      ><v-spacer></v-spacer>
      <v-btn width="100%" color="primary" @click="pay">Pay Now</v-btn>
      <v-spacer></v-spacer
    ></v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    pay() {
      this.$store.dispatch("payment/pay");
    },
  },
};
</script>

<style></style>
