<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8"><fees :fees="fees"></fees></v-col>
      <v-col cols="12" sm="4"><history></history> </v-col>
    </v-row>
    <v-row
      ><v-col cols="12" lg="8"><pay @setPaymentHistory="setPaymentHistory"></pay> </v-col>
    </v-row>
  </v-container>
</template>

<script>
const Pay = () => import("@/components/payment/Pay.vue");
const Fees = () => import("@/components/payment/Fees.vue");
const History = () => import("@/components/payment/History.vue");

export default {
  components: { History, Fees, Pay },
  data() {
    return {
      selected_room: 1,
      fees: [],
    };
  },
  created() {
    this.loadFees();
  },
  computed: {},
  methods: {
    setPaymentHistory(history) {
      this.history = history;
    },
    loadFees() {
      this.$api.get("user_fees/").then((response) => {
        this.fees = response.data;
      });
    },
  },
};
</script>

<style></style>
