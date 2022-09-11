<template>
  <v-container fluid fill-height>
    <JitsiMeet
      :roomName="$route.params.roomName"
      :userInfo="{
        displayName: $store.getters['user/getName'],
        email: $store.getters['user/getEmail'],
        // avatar: $store.getters['user/getAvatar'],
      }"
    >
    </JitsiMeet>
  </v-container>
</template>

<script>
import JitsiMeet from "../components/global/JitsiMeet.vue";
export default { components: { JitsiMeet } };
</script>

<style>
</style>