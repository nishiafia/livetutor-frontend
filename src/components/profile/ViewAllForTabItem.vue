<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"> Assignments </v-card-title>
    <v-data-table :headers="headers" :items="items" :items-per-page="15" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on"> mdi-call-made </v-icon>
          </template>
          <span>Go to page</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="$emit('closeDialog')"> Close </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["items", "headers"],
  emits: ["closeDialog"],
};
</script>

<style></style>
