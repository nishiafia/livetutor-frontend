<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" lg="6">
        <v-form>
          <v-card class="pa-4">
            <v-card-title>Update Organization Details</v-card-title>
            <v-divider class="mb-6 mx-4"></v-divider>
            <v-row justify="center">
              <v-col cols="4">
                <v-hover v-slot="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }"
                  >
                    <v-img
                      :src="organization.photo"
                      contain
                      height="200"
                      alt="photo of organization"
                      @click="$refs.imgSelector.click()"
                      ><v-row class="justify-center align-center fill-height">
                        <v-icon v-if="hover" x-large>mdi-upload</v-icon>
                      </v-row>
                    </v-img>
                  </v-card>
                </v-hover>

                <input
                  type="file"
                  hidden
                  accept="image/png, image/jpeg, image/jpg"
                  ref="imgSelector"
                  @change="onImageChange"
              /></v-col>
            </v-row>

            <v-text-field label="Organization Name" v-model="organization.name">
            </v-text-field>
            <v-text-field
              label="Organization Address"
              v-model="organization.address"
            >
            </v-text-field>
            <v-text-field
              label="Organization Email"
              v-model="organization.email"
            >
            </v-text-field>
            <v-text-field
              label="Organization Phone"
              v-model="organization.phone"
            >
            </v-text-field>
            <v-card-actions>
              <v-btn @click="updateOrganization()" color="success" block
                >Update Organization</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      organization: {},
      photoFile: null,
    };
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
    },
    onImageChange(e) {
      this.photoFile = e.target.files[0];
      this.organization.photo = URL.createObjectURL(this.photoFile);
    },
    updateOrganization() {
      const organizationData = this.organization;
      delete organizationData.photo;
      this.$store
        .dispatch("organization/updateOrganizationDetails", {
          ...organizationData,
          ...(this.photoFile && { photo: this.photoFile }),
        })
        .then((data) => (this.organization = data));
    },
  },
};
</script>

<style>
</style>