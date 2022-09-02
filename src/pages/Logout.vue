<template>
  <h1 v-if="logged_out">Logged Out Successfully</h1>
</template>

<script>
export default {
  data() {
    return {
      logged_out: false,
    };
  },
  created() {
    this.$store.dispatch("user/logout");
    this.logged_out = true;
  },
};
</script>

<style>
</style>
