<template>
  <v-container fill-height>
    <v-row v-if="logged_out" justify="center" align="center">
      <v-col cols="12" md="8" lg="6">
        <v-card outlined>
          <v-card-title>
            <span class="headline">Logged out</span>
          </v-card-title>
          <v-card-text>
            <p>You have been logged out.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
