<template>
  <div ref="jitsiContainer" style="height: 100%; width: 100%"></div>
</template>

<script>
export default {
  props: {
    roomName: {
      type: String,
      default: "openLounge",
    },
    jwt: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    console.log(this.jwt);
    this.loadJitsiScript().then(() => {
      this.loading = true;
      this.initJitsi();
      this.loading = false;
    });
  },
  methods: {
    loadJitsiScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src =
          "https://" + process.env.VUE_APP_JITSI_BASEURL + "/external_api.js";
        document.head.appendChild(script);
        script.onload = () => {
          return resolve();
        };
        script.onerror = () => {
          return reject();
        };
      });
    },
    initJitsi() {
      const options = {
        roomName: this.roomName,
        jwt: this.jwt,
        parentNode: this.$refs.jitsiContainer,
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      };

      this.meet = new window.JitsiMeetExternalAPI(
        process.env.VUE_APP_JITSI_BASEURL,
        options
      );
    },
  },
};
</script>

<style>
</style>
