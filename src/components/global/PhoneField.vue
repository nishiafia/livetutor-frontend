<template>
  <v-form ref="phoneFieldForm">
    <v-row class="d-flex-inline">
      <v-col cols="5" sm="3">
        <v-select
          :items="countries"
          v-model="country"
          item-value="id"
          :rules="requiredRules"
        >
          <template #item="{ item }">
            <v-img width="32" height="16" v-html="item.flag"></v-img>
            <span class="mx-2"> {{ item.name }} </span>
          </template>
          <template #selection="{ item }">
            <v-img width="32" height="16" v-html="item.flag"></v-img>

            <!-- <v-icon class="mx-2"> {{ item.icon }} </v-icon
            > -->
            <span class="mx-2"> {{ item.phone_code }} </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="7" sm="9" class="mx-md-0 pl-md-0">
        <v-text-field
          @input="handleInput"
          :rules="phoneRules"
          label="Mobile"
        ></v-text-field>
      </v-col> </v-row
  ></v-form>
</template>

<script>
export default {
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      phoneFieldForm: "",
      country: "",
      // countryCode: "+88",
      requiredRules: [(v) => !!v || "This Field is Required"],
      countries: [],
    };
  },

  computed: {
    phoneRules() {
      return [
        ...this.rules,
        (v) => !!v || "Phone is required",
        (v) => /^\d{11}$/.test(v) || "Phone must be 11 digits",
      ];
    },
  },
  created() {
    this.loadCountries();
  },
  methods: {
    loadCountries() {
      return this.$api
        .get("/locations/countries/")
        .then((res) => {
          this.countries = res.data;
        })
        .then(() => (this.country = this.countries[0].id));
    },
    handleInput(e) {
      this.$emit("input", {
        country: this.country,
        phone: e,
      });
    },
    validate() {
      return this.$refs.phoneFieldForm.validate();
    },
  },
};
</script>

<style scoped>
</style>
