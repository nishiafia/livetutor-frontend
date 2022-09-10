<template>
  <v-container fluid fill-height>
    <JitsiMeet :roomName="$route.params.roomName" :jwt="jwt"> </JitsiMeet>
  </v-container>
</template>

<script>
import JitsiMeet from "../components/global/JitsiMeet.vue";
export default { components: { JitsiMeet } };
</script>

<style>
</style>