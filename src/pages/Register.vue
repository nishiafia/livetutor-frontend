<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mx-4 pa-4">
          <v-form
            @submit.prevent="check_mobile()"
            ref="form1"
            v-show="!otp_verified"
            v-model="valid_form1"
          >
            <PhoneField ref="phoneField" v-model="mobile"></PhoneField>
            <v-alert type="info" class="d-flex align-items-center">
              Please save the below pin code for your login
            </v-alert>
            <v-text-field
              readonly
              :rules="$requiredRules"
              v-model="password"
            ></v-text-field>
            <v-btn type="submit" color="success" block>Continue</v-btn>
          </v-form>
          <v-form ref="form2" v-show="otp_verified">
            <v-text-field
              v-model="username"
              label="Username"
              :rules="$requiredRules"
            >
            </v-text-field>
            <v-text-field
              v-model="name"
              label="Full Name"
              :rules="$requiredRules"
            >
            </v-text-field>
            <v-text-field
              v-model="address"
              :rules="$requiredRules"
              label="Address"
            ></v-text-field>
            <v-text-field
              v-model="email"
              type="email"
              :rules="$requiredRules"
              label="Email"
            ></v-text-field>
            <v-btn @click="register()" color="success" block
              >Create Account</v-btn
            >
          </v-form>
        </v-card>
        <v-snackbar
          :timeout="5000"
          v-model="snackbar"
          :color="snackbar_color"
          bottom
          left
        >
          {{ snackbar_text }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import PhoneField from "../components/global/PhoneField.vue";
export default {
  components: { PhoneField },
  name: "Register",
  data() {
    return {
      snackbar: false,
      snackbar_text: "",
      snackbar_color: "",
      valid_form1: true,
      form1: "",
      form2: "",
      name: "",
      mobile: "",
      address: undefined,
      email: undefined,
      password: Math.random().toString().slice(2, 6),
      otp: "",
      username: "",
      pass_generated: false,
      server_otp: "",
      otp_verified: false,
      reg_complete: false,
      profile_completed: false,
    };
  },
  methods: {
    check_mobile() {
      if (this.$refs.phoneField.validate() && this.$refs.form1.validate()) {
        this.otp_verified = true;
        this.$refs.form2.resetValidation();
      }
    },
    register() {
      if (this.$refs.form2.validate()) {
        const data = {
          username: this.username,
          name: this.name,
          phone: this.mobile,
          address: this.address,
          password: this.password,
          email: this.email,
        };
        const register_url =
          process.env.NODE_ENV === "production"
            ? process.env.VUE_APP_BACKEND_BASEURL + "users/" //TODO: search possibility
            : "http://localhost:8000/api/users/";

        return axios
          .post(register_url, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() =>
            this.$store.dispatch("user/login", {
              phone: this.mobile,
              password: this.password,
            })
          )
          .then(() => this.$router.push("/profile"))
          .catch((err) => {
            console.log(err);
            this.snackbar = true;
            this.snackbar_text = err;
            this.snackbar_color = "red lighten-2";
          });
      }
    },
  },
};
</script>
