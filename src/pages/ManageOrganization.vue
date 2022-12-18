<template>
  <v-container>
    <v-navigation-drawer absolute dark color="primary">
      <v-list>
        <v-list-group v-for="item in menus" :key="item.title" color="white">
          <template #prependIcon>
            <v-icon class="mx-0 px-0">
              {{ item.icon }}
            </v-icon>
          </template>
          <template #activator>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </template>

          <v-list-item
            v-for="child in item.submenus"
            :key="child.name"
            :to="child.to"
            link
          >
            <v-list-item-title v-text="child.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main> <router-view></router-view></v-main>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sidebar: true,
      menus: [
        {
          name: "Organization",
          icon: "mdi-account-group",
          submenus: [
            {
              name: "Update Details",
              icon: "mdi-account-edit",
              to: "/update-organization-details",
            },
          ],
        },
        {
          name: "Users",
          icon: "mdi-account-multiple",
          submenus: [
            {
              name: "Add Users",
              icon: "mdi-account-plus",
              to: "/add-organization-users",
            },
          ],
        },
        {
          name: "Fees",
          icon: "mdi-cash-multiple",
          submenus: [
            {
              name: "Add New Fee",
              icon: "mdi-cash-plus",
            },
          ],
        },
         {
          name: "SMS",
          icon: "mdi-cellphone-android",
          submenus: [
            {
              name: "Send SMS",
              icon: "mdi-cellphone-android",
              to: "/send-sms-notification-to-users",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
</style>
