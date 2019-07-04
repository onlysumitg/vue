<template>
  <v-app>
    <v-toolbar flat dark app>
      <v-toolbar-title class="headline text-uppercase">
        <span>QSys:</span>
        <span class="font-weight-light">for i</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat target="_blank">
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>

    <v-content style="padding-top:30px">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  }
};
</script>
