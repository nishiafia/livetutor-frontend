<template>
  <v-card class="pa-0">
    <v-toolbar min-width="100%" dark color="primary">
      <v-card-title>Monthly Fees Heads</v-card-title>
      <v-spacer> </v-spacer>
      <v-dialog max-width="600px" v-model="dialogNewFee">
        <template v-slot:activator="{ attrs, on }"
          ><v-btn v-bind="attrs" class="ma-4" dark v-on="on" outlined
            >Add New Fee</v-btn
          >
        </template>
        <new-fee :room_id="room_id" @closeDialog="closeDialogNewFee"></new-fee>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items" class="pa-4"></v-data-table>
  </v-card>
</template>

<script>
import NewFee from "./NewFee.vue";
export default {
  components: { NewFee },
  props: ["room_id", "items"],

  data() {
    return {
      dialogNewFee: false,

      headers: [
        {
          text: "Name",
          value: "fee.name",
        },
        {
          text: "Amount",
          value: "fee.amount",
        },
        {
          text: "Month",
          value: "fee_month",
        },
        {
          text: "Year",
          value: "year",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
    };
  },
  created() {},
  methods: {
    closeDialogNewFee() {
      this.dialogNewFee = false;
    },
  },
};
</script>

<style></style>
