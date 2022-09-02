<template>
  <v-card class="pa-4">
    <v-card-title>Create New Fee</v-card-title>
    <v-row>
      <v-col cols="12" sm="6"> <v-text-field v-model="name" label="Title"></v-text-field></v-col
      ><v-col cols="12" sm="6">
        <v-text-field v-model="amount" label="Amount"></v-text-field
      ></v-col>
    </v-row>

    <v-select
      multiple
      chips
      v-model="months"
      label="Select Month(s)"
      :items="remaining_months"
      item-text="text"
      item-value="value"
    ></v-select>

    <v-select v-model="year" :items="year_choices" label="Year"></v-select>
    <room-users :room_id="$route.params.id" @set_users="set_users"></room-users>
    <v-card-actions>
      <v-spacer> </v-spacer>
      <v-btn :loading="loading" color="primary" outlined @click="createFee">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const RoomUsers = () => import("@/components/room/RoomUsers.vue");
export default {
  props: ["room_id"],
  components: { RoomUsers },
  emits: ["closeDialog"],
  inject: ["refresh"],
  data() {
    return {
      selected_users: [],
      amount: "",
      name: "",
      months: [],
      year: new Date().getFullYear(),
      loading: false,
      month_list: [
        { text: "January", value: "1" },
        { text: "February", value: "2" },
        { text: "March", value: "3" },
        { text: "April", value: "4" },
        { text: "May", value: "5" },
        { text: "June", value: "6" },
        { text: "July", value: "7" },
        { text: "August", value: "8" },
        { text: "September", value: "9" },
        { text: "October", value: "10" },
        { text: "November", value: "11" },
        { text: "December", value: "12" },
      ],
    };
  },
  computed: {
    remaining_months() {
      if (this.year === new Date().getFullYear()) {
        return this.month_list.filter((month) => month.value > new Date().getMonth());
      } else {
        return this.month_list;
      }
    },
    year_choices() {
      let years = [new Date().getFullYear()];
      if (new Date().getMonth === 11) {
        years.append(new Date().getFullYear() + 1);
      }
      return years;
    },
  },
  methods: {
    createFee() {
      this.loading = true;
      const fees = this.months.map((month) => ({
        month: month,
        fee: {
          name: this.name,
          amount: this.amount,
        },
        year: this.year,
        room: this.room_id,
        room_user: this.selected_users.map((user) => user.id),
      }));
      this.$api
        .post(`/rooms/${this.room_id}/fees/`, fees)
        .then(() => {
          this.loading = false;
          this.refresh();
          this.$emit("closeDialog");
        })
        .catch((err) => {
          alert(err);
          this.loading = false;
        });
    },
    set_users(users) {
      this.selected_users = users;
    },
  },
};
</script>

<style></style>
