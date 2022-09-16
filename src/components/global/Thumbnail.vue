<template>
  <v-img
    v-if="
      file
        .split('.')
        .pop()
        .match(/(jpg|jpeg|png|gif)$/i)
    "
    :src="file"
    max-width="100%"
    height="150"
    @click="openFile(file)"
    class="grey lighten-2"
  />
  <v-img v-else max-width="100%" height="150" @click="openFile(file)">
    <v-row justify="center" align="center" class="fill-height">
      <v-card-title>{{ file.split(".").pop() }}</v-card-title>
    </v-row>
  </v-img>
</template>

<script>
export default {
  name: "Thumbnail",
  props: {
    file: {
      type: String,
      required: true,
    },
  },
  methods: {
    openFile(file) {
      window.open(file, "_blank");
    },
  },
};
</script>

<style>
</style>
