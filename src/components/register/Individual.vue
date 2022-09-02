<template>
  <div>
    <v-text-field v-model="education" label="Last Education"></v-text-field>
  </div>
</template>

<script>
export default {
  name: "Individual",
  emits: ["set_education"],
  data() {
    return { education: "" };
  },
  watch: {
    education(newVal, oldVal) {
      if (newVal !== oldVal) this.$emit("set_education", this.education);
    },
  },
};
</script>

<style>
</style>
