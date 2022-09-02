<template>
  <div>
    <v-text-field label="Institution Name" v-model="org_name"></v-text-field>
    <v-select
      v-model="org_type"
      :items="org_types"
      item-text="label"
      item-value="value"
      label="Company Type"
    ></v-select>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Institution",
  emits: ["set_org_name", "set_org_type"],
  data() {
    return { org_name: "", org_type: "", org_types: [] };
  },
  mounted: function () {
    axios.get(this.$apiAdress + "/api/orgtypes").then(
      (res) =>
        (this.org_types = res.data.map((org_type) => ({
          label: org_type.name,
          value: org_type.id,
        })))
    );
  },
  watch: {
    org_name(newVal, oldVal) {
      if (newVal !== oldVal) this.$emit("set_org_name", this.org_name);
    },
    org_type(newVal, oldVal) {
      if (newVal !== oldVal) this.$emit("set_org_type", this.org_type);
    },
  },
};
</script>

<style>
</style>
