<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="4">
        <v-card elevation="2" class="pa-4" min-height="320">
          <v-form @submit.prevent="login" ref="form" v-model="valid">
            <v-card-title>Login</v-card-title>
            <v-card-subtitle class="text-muted"
              >Sign In to your account</v-card-subtitle
            >
            <PhoneField v-model="countryPhone" ref="phoneField"></PhoneField>
            <!-- <vue-tel-input-vuetify
              v-model="mobile"
              :rules="$phoneRules"
              counter="11"
              type="tel"
            ></vue-tel-input-vuetify> -->
            <v-text-field
              :rules="$requiredRules"
              v-model="password"
              label="Password"
              type="password"
              autocomplete="curent-password"
            >
            </v-text-field>
            <v-row>
              <v-col>
                <v-btn type="submit" outlined color="primary lighten-2"
                  >Login</v-btn
                >
              </v-col>
              <v-col col="6" class="text-right">
                <v-btn outlined color="red lighten-2">Forgot password?</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card
          dark
          elevation="2"
          color="#406882"
          min-height="320"
          class="text-center pa-4"
        >
          <v-card-title>Sign up</v-card-title>
          <p>
            Meeting Me, provides a seamless experience to the student, teacher
            and organization about tutoring.
          </p>
          <v-btn color="primary lighten-5" outlined @click="goRegister()">
            Register Now!
          </v-btn>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import PhoneField from "@/components/global/PhoneField.vue";
export default {
  name: "Login",
  components: {
    PhoneField,
  },
  data() {
    return {
      form: "",
      countryPhone: "",
      password: "",
      showMessage: false,
      message: "",
      valid: true,
    };
  },
  methods: {
    goRegister() {
      this.$router.push({ path: "register" });
    },
    login() {
      this.$refs.form.validate();
      this.$refs.phoneField.validate();
      if (this.valid) {
        this.$store
          .dispatch("user/login", {
            country: this.countryPhone.country,
            phone: this.countryPhone.phone,
            password: this.password,
          })
          .then(() => this.$router.push("/profile"))
          .catch(() => alert("Could Not Log In"));
      }
    },
  },
};
</script>
