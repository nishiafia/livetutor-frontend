<template>
  <v-container>
    <v-row>
      <v-col lg="8"><fee-payment-summary></fee-payment-summary></v-col>
      <v-col lg="4"
        ><FeeHeads
          :items="items"
          :room_id="$route.params.id"
          :refresh="loadFees"
        ></FeeHeads
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import FeeHeads from "@/components/fees/FeeHeads.vue";
import FeePaymentSummary from "@/components/fees/FeePaymentSummary.vue";
export default {
  provide() {
    return {
      refresh: this.loadFees,
    };
  },
  components: {
    FeeHeads,
    FeePaymentSummary,
  },
  data() {
    return {
      items: [],
      summary: [],
    };
  },

  created() {
    this.loadFees();
  },
  methods: {
    loadFees() {
      this.$api
        .get(`/rooms/${this.$route.params.id}/fees/`, {
          room_id: this.$route.params.id,
        })
        .then((response) => {
          this.items = response.data;
        });
    },
  },
};
</script>

<style></style>
