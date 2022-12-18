<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" lg="6">
        <v-form>
          <v-card class="pa-4">
            <v-card-title>Send SMS Notification</v-card-title>
            <v-divider class="mb-6 mx-4"></v-divider>
             <v-combobox
              v-model="selected_rooms"
              label="Room"
              :items="classes"
              item-text="name"
              item-value="id"
              chips
              multiple
              :return-object="false"
            ></v-combobox>
            <v-textarea
              label="Message"
              v-model="message"
            >
            </v-textarea>
            <v-card-actions>
              <v-btn @click="sendNotification()" color="success" block
                >Send Notification</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
import api from "@/services/api";
export default {
  data() {
    return {
      organization: {},
      photoFile: null,
      message: '',
     // classes: [],
       id: "",
        name: "",
      selected_rooms: [],
    };
  },
    computed: {
    classes() {
      return this.$store.state.classes.classes;
    },
  },
  created() {
    this.loadOrganizationDetails();
  },
  methods: {
    loadOrganizationDetails() {
      const organizationID = this.$store.getters["user/getOrganizationID"];
      this.$store
        .dispatch("organization/loadOrganizationDetails", organizationID)
        .then(
          () =>
            (this.organization =
              this.$store.getters["organization/getOrganizationDetails"])
        );
         console.log("UserID:",this.organization.email);
    },
    onImageChange(e) {
      this.photoFile = e.target.files[0];
      this.organization.photo = URL.createObjectURL(this.photoFile);
    },
    sendNotification() {
      var Jsondata = {
            Message: this.message,
            Room: this.selected_rooms,
        };
      console.log("ssss=",this.selected_rooms);
      var config = {
        method: 'post',
        url: 'http://localhost:8000/api/sms/send/',
        headers: {
            'Content-Type': 'application/json'
          },
        data: JSON.stringify(Jsondata),
        };
        Axios(config)
        .then(function (response) {
          console.log("Res ",JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

        // this.$api
        // .post("sms/send/", {
        //   data: {},
        // })
        // .then((res) => {
        //   console.log('res', res);
        // });
            //var axios = require('axios');
            // var data = JSON.stringify({"SenderId":"8809638011099","Is_Unicode":true,"Is_Flash":true,"Message":"Hello, its a test message 02","MobileNumbers":"8801894617885","ApiKey":"F+sz1LXLaB7LyOdiS4DoiCoSfkC+OrSdnPCgc3a5Odk=","ClientId":"ef0bdce1-4599-4607-be95-f67c7ce04b88"});

            // var config = {
            //   method: 'post',
            //   url: 'https://sms.novocom-bd.com/api/v2/SendSMS',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   data : data
            // };

            // Axios(config)
            // .then(function (response) {
            //   console.log("Res ",JSON.stringify(response.data));
            // })
            // .catch(function (error) {
            //   console.log(error);
            // });

        //   Axios({
        //     type: "GET",
        //     url:"https://sms.novocom-bd.com/api/v2/Balance?ApiKey=F+sz1LXLaB7LyOdiS4DoiCoSfkC+OrSdnPCgc3a5Odk=&ClientId=ef0bdce1-4599-4607-be95-f67c7ce04b88",
        //     contentType: "application/json",
        //     dataType: 'json',
        //     success: function (response) { 
        //         console.log("response=",response)
        //     }
        // });

    },
  },
};
</script>

<style>
</style>